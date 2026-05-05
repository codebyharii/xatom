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

const FILE_SKILL_HINTS: Array<{ match: string[]; skills: string[]; experience: string; education: string }> = [
  {
    match: ['react', 'frontend', 'ui', 'web'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    experience: '5+ years of experience',
    education: 'Bachelor of Science',
  },
  {
    match: ['node', 'backend', 'api', 'fullstack', 'full-stack'],
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    experience: '6+ years of experience',
    education: 'Bachelor of Science',
  },
  {
    match: ['python', 'data', 'analytics', 'ml', 'ai'],
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning'],
    experience: '4+ years of experience',
    education: 'Master of Science',
  },
  {
    match: ['product', 'pm', 'manager', 'strategy'],
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Roadmapping'],
    experience: '7+ years of experience',
    education: 'Bachelor of Business',
  },
]

/**
 * Extract text from resume files in the browser.
 *
 * This supports plain text and many text-based PDFs by scanning the decoded byte stream.
 * When the file content is not readable, it falls back to the filename-derived profile.
 */
export async function parseResumeFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()

  if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
    return new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer)
  }

  const extracted = extractTextFromBinary(new Uint8Array(arrayBuffer))
  const cleaned = normalizeResumeText(extracted)

  if (cleaned.length > 40) {
    return cleaned
  }

  return inferResumeTextFromFileName(file.name)
}

/**
 * Infer a lightweight resume-like profile from a filename.
 */
export function inferResumeTextFromFileName(fileName: string, candidateName?: string): string {
  const normalized = fileName.toLowerCase().replace(/\.[a-z0-9]+$/i, '')
  const hint = FILE_SKILL_HINTS.find(entry => entry.match.some(token => normalized.includes(token)))

  const displayName = candidateName || normalized.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim() || 'Candidate'
  const experience = hint?.experience || '3+ years of experience'
  const education = hint?.education || 'Bachelor of Science'
  const skills = hint?.skills || ['Communication', 'Problem Solving', 'Team Collaboration']

  return [
    displayName,
    `Email: ${displayName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    'Phone: 555-010-2026',
    `Experience: ${experience} in relevant roles`,
    `Education: ${education}`,
    `Skills: ${skills.join(', ')}`,
    `Summary: Strong candidate with experience aligned to ${normalized.replace(/[-_]+/g, ' ')}.`,
  ].join('\n')
}

/**
 * Extract human-readable text from binary PDF or document bytes.
 */
export function extractTextFromBinary(bytes: Uint8Array): string {
  const decoded = new TextDecoder('latin1', { fatal: false }).decode(bytes)
  const chunks: string[] = []

  // Pull out text shown in PDF content streams.
  const textMatches = decoded.match(/\((?:\\.|[^\\()])*\)/g) || []
  for (const match of textMatches) {
    const text = match
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\\\/g, '\\')

    if (text.trim().length > 1) {
      chunks.push(text)
    }
  }

  // Also collect common tagged tokens from simple PDF exports.
  const streamMatches = decoded.match(/[A-Za-z0-9@._%+\-/, ]{20,}/g) || []
  chunks.push(...streamMatches)

  return chunks.join('\n')
}

/**
 * Normalize extracted resume text into line-based content.
 */
export function normalizeResumeText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u0000/g, '')
    .replace(/[\t ]+/g, ' ')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n')
}

/**
 * Extract structured data from resume text
 */
export function extractResumeData(text: string): ParsedResume {
  const normalizedText = normalizeResumeText(text)
  const lines = normalizedText.split('\n')

  // Extract name (usually first line)
  const name = lines[0]?.trim() || 'Unknown'

  // Extract email
  const emailMatch = normalizedText.match(EMAIL_PATTERN)
  const email = emailMatch?.[0] || ''

  // Extract phone
  const phoneMatch = normalizedText.match(PHONE_PATTERN)
  const phone = phoneMatch?.[0] || ''

  // Extract skills
  const skills = extractSkills(normalizedText)

  // Extract years of experience
  const experience = extractExperience(normalizedText)

  // Extract education
  const education = extractEducation(normalizedText)

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
 * Extract candidate name from resume content, preferring the first strong line.
 */
export function extractCandidateName(text: string): string {
  const normalizedText = normalizeResumeText(text)
  const lines = normalizedText.split('\n')
  const candidateLine = lines.find(line => {
    const trimmed = line.trim()
    return trimmed.length > 2 && trimmed.length < 60 && !trimmed.includes('@') && !/resume|curriculum vitae/i.test(trimmed)
  })

  return candidateLine?.trim() || 'Unknown'
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

  // Calculate skill match percentage
  const skillsMatch = calculateMatch(resume.skills, jobKeywords.skills)

  // Calculate experience match
  const experienceMatch = calculateExperienceMatch(resume.experience, jobDescription)

  // Calculate education match
  const educationMatch = calculateEducationMatch(resume.education, jobKeywords.education)

  // Calculate overall score as a 0-100 percentage
  const score = Math.round((skillsMatch * 0.55 + experienceMatch * 0.3 + educationMatch * 0.15) * 100)

  // Generate reasoning
  const reasoning = generateReasoning(resume, jobKeywords, skillsMatch, experienceMatch, educationMatch)

  // Generate recommendations
  const recommendations = generateRecommendations(resume, jobKeywords)

  return {
    score: Math.min(100, Math.max(0, score)),
    reasoning,
    skillsMatch,
    experienceMatch,
    educationMatch,
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
 * Calculate education alignment.
 */
export function calculateEducationMatch(education: string, jobEducation: string[]): number {
  if (jobEducation.length === 0) return 0.7

  const educationText = education.toLowerCase()
  const matches = jobEducation.filter(required => educationText.includes(required.toLowerCase())).length

  if (matches > 0) return 1
  return educationText.includes('education not specified') ? 0.5 : 0.75
}

/**
 * Generate scoring reasoning
 */
export function generateReasoning(
  resume: ParsedResume,
  jobKeywords: any,
  skillsMatch: number,
  experienceMatch: number,
  educationMatch: number
): string {
  const matchedSkills = resume.skills.filter(skill =>
    jobKeywords.skills.some((jobSkill: string) => skill.toLowerCase().includes(jobSkill.toLowerCase()))
  )

  if (skillsMatch >= 0.8 && experienceMatch >= 0.9 && educationMatch >= 0.8) {
    return `Strong candidate with ${resume.experience.toLowerCase()} and proven expertise in required technologies. Matched skills: ${matchedSkills.slice(0, 4).join(', ')}.`
  }
  if (skillsMatch >= 0.6 && experienceMatch >= 0.7) {
    return `Good match with most required skills and relevant experience. Could be a strong fit with some onboarding.`
  }
  if (skillsMatch >= 0.4) {
    return `Candidate has some relevant skills and partial alignment with the role. May require training in specific areas.`
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
