// Resume parsing and candidate scoring utilities

export interface ParsedResume {
  name: string
  email: string
  phone: string
  skills: string[]
  experience: string
  education: string
  summary: string
}

export interface ScoringResult {
  score: number // 0-100
  reasoning: string
  skillsMatch: number
  experienceMatch: number
  educationMatch: number
  recommendations: string[]
}

// Common job-related keywords and skills
export const SKILL_KEYWORDS = {
  frontend: ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'next.js'],
  backend: ['node.js', 'python', 'java', 'go', 'rust', 'c#', '.net', 'php'],
  database: ['postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch'],
  devops: ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'jenkins'],
  dataScience: ['python', 'r', 'tensorflow', 'pytorch', 'scikit-learn', 'sql'],
  productManagement: ['product strategy', 'roadmap', 'user research', 'analytics', 'metrics'],
}

const YEARS_PATTERN = /(\d+)\s*\+?\s*years?/gi
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const PHONE_PATTERN = /(\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g

/**
 * Extract text from resume (placeholder for file parsing)
 */
export async function parseResumeFile(file: File): Promise<string> {
  // In production, use a library like pdf-parse or pptx-parse
  // For now, return filename as placeholder
  return file.name
}

/**
 * Extract structured data from resume text
 */
export function extractResumeData(text: string): ParsedResume {
  const lines = text.split('\n')

  // Extract name (usually first line)
  const name = lines[0]?.trim() || 'Unknown'

  // Extract email
  const emailMatch = text.match(EMAIL_PATTERN)
  const email = emailMatch?.[0] || ''

  // Extract phone
  const phoneMatch = text.match(PHONE_PATTERN)
  const phone = phoneMatch?.[0] || ''

  // Extract skills
  const skills = extractSkills(text)

  // Extract years of experience
  const experience = extractExperience(text)

  // Extract education
  const education = extractEducation(text)

  // Create summary
  const summary = createSummary(name, experience, skills)

  return {
    name,
    email,
    phone,
    skills,
    experience,
    education,
    summary,
  }
}

/**
 * Extract skills from resume text
 */
export function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase()
  const skills: Set<string> = new Set()

  // Check against all skill keywords
  Object.values(SKILL_KEYWORDS).flat().forEach(skill => {
    if (lowerText.includes(skill)) {
      skills.add(capitalizeWord(skill))
    }
  })

  return Array.from(skills)
}

/**
 * Extract years of experience from text
 */
export function extractExperience(text: string): string {
  const matches = text.match(YEARS_PATTERN)
  if (matches && matches.length > 0) {
    const years = Math.max(...matches.map(m => parseInt(m)))
    return `${years}+ years of experience`
  }
  return 'Experience not specified'
}

/**
 * Extract education info from text
 */
export function extractEducation(text: string): string {
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'diploma', 'certificate']
  const lowerText = text.toLowerCase()

  for (const keyword of educationKeywords) {
    if (lowerText.includes(keyword)) {
      // Find the line with education keyword
      const lines = text.split('\n')
      const eduLine = lines.find(line => line.toLowerCase().includes(keyword))
      if (eduLine) {
        return eduLine.trim()
      }
      return `${capitalizeWord(keyword)}`
    }
  }

  return 'Education not specified'
}

/**
 * Create a summary of candidate
 */
export function createSummary(name: string, experience: string, skills: string[]): string {
  return `${name} with ${experience}. Key skills: ${skills.slice(0, 5).join(', ')}.`
}

/**
 * Score a candidate based on job description
 */
export function scoreCandidate(
  resume: ParsedResume,
  jobDescription: string
): ScoringResult {
  const jobKeywords = extractJobKeywords(jobDescription)
  const resumeText = `${resume.skills.join(' ')} ${resume.experience} ${resume.education}`

  // Calculate skill match percentage
  const skillsMatch = calculateMatch(resume.skills, jobKeywords.skills)

  // Calculate experience match
  const experienceMatch = calculateExperienceMatch(resume.experience, jobDescription)

  // Calculate overall score
  const score = Math.round((skillsMatch * 0.5 + experienceMatch * 0.5) * 100) / 100

  // Generate reasoning
  const reasoning = generateReasoning(resume, jobKeywords, skillsMatch, experienceMatch)

  // Generate recommendations
  const recommendations = generateRecommendations(resume, jobKeywords)

  return {
    score: Math.min(100, Math.max(0, score)),
    reasoning,
    skillsMatch,
    experienceMatch,
    educationMatch: 0.7,
    recommendations,
  }
}

/**
 * Extract keywords and requirements from job description
 */
export function extractJobKeywords(jobDescription: string): {
  skills: string[]
  experience: number
  education: string[]
} {
  const text = jobDescription.toLowerCase()
  const skills: string[] = []
  const education: string[] = []

  // Extract skills
  Object.entries(SKILL_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        skills.push(capitalizeWord(keyword))
      }
    })
  })

  // Extract required years
  const yearsMatch = text.match(/(\d+)\+?\s*years?/i)
  const experience = yearsMatch ? parseInt(yearsMatch[1]) : 0

  // Extract education requirements
  if (text.includes('bachelor')) education.push('Bachelor')
  if (text.includes('master')) education.push('Master')
  if (text.includes('phd')) education.push('PhD')

  return {
    skills: [...new Set(skills)],
    experience,
    education,
  }
}

/**
 * Calculate percentage match between two skill arrays
 */
export function calculateMatch(candidateSkills: string[], jobSkills: string[]): number {
  if (jobSkills.length === 0) return 1

  const matches = candidateSkills.filter(skill =>
    jobSkills.some(jobSkill => skill.toLowerCase().includes(jobSkill.toLowerCase()))
  ).length

  return matches / jobSkills.length
}

/**
 * Calculate experience match score
 */
export function calculateExperienceMatch(experience: string, jobDescription: string): number {
  const yearsMatch = experience.match(/(\d+)/i)
  const jobMatch = jobDescription.match(/(\d+)\s*\+?\s*years?/i)

  if (!yearsMatch || !jobMatch) return 0.5

  const candidateYears = parseInt(yearsMatch[1])
  const requiredYears = parseInt(jobMatch[1])

  if (candidateYears >= requiredYears) return 1
  return Math.max(0.5, candidateYears / requiredYears)
}

/**
 * Generate scoring reasoning
 */
export function generateReasoning(
  resume: ParsedResume,
  jobKeywords: any,
  skillsMatch: number,
  experienceMatch: number
): string {
  if (skillsMatch >= 0.8 && experienceMatch >= 0.9) {
    return `Strong candidate with ${resume.experience.toLowerCase()} and proven expertise in required technologies.`
  }
  if (skillsMatch >= 0.6 && experienceMatch >= 0.7) {
    return `Good match with most required skills and relevant experience. Could be great fit with some onboarding.`
  }
  if (skillsMatch >= 0.4) {
    return `Candidate has some relevant skills. May require training in specific areas.`
  }
  return `Limited alignment with job requirements. Consider for future roles or with additional training.`
}

/**
 * Generate improvement recommendations
 */
export function generateRecommendations(resume: ParsedResume, jobKeywords: any): string[] {
  const recommendations: string[] = []

  // Check missing skills
  const missingSkills = jobKeywords.skills.filter(
    (skill: string) => !resume.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  )

  if (missingSkills.length > 0) {
    recommendations.push(`Strong candidate. Consider training in ${missingSkills.slice(0, 2).join(', ')}`)
  }

  recommendations.push('Excellent cultural fit based on profile')
  recommendations.push('Recommend proceeding to interview stage')

  return recommendations.slice(0, 3)
}

/**
 * Capitalize first letter of word
 */
export function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Format resume for display
 */
export function formatResumeForDisplay(resume: ParsedResume): string {
  return `
    Name: ${resume.name}
    Email: ${resume.email}
    Phone: ${resume.phone}
    Experience: ${resume.experience}
    Education: ${resume.education}
    Skills: ${resume.skills.join(', ')}
  `
}
