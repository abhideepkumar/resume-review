const promptText = (raw_text) => {
  const prompt = `
  You are an expert resume parser.Extract the following information from the resume text and output a JSON object with the keys:
  {
    "name": <name>,
    "email": <email>,
    "education": [{
      "degree": <degree>,
      "branch": <branch>,
      "institution": <institution>,
      "year": <year>
    }],
    "experience":[ {
      "job_title": <job_title>,
      "company": <company>,
      "start_date": <start_date>,
      "end_date": <end_date>
    }],
    "projects":[{
      "project_name": <project_name>,
      "description": <description>,
      "skills_used":[{"skill_name": <skill like javacript>, "level": <level between 1 to 5 based on projects>}, {"skill_name": <skill like react>, "level": <level between 1 to 5 based on projects>}, ...]
    }],
   "skills": [{"skill_name": <skill like javacript>, "level": <level between 1 to 5 based on projects>}, {"skill_name": <skill like react>, "level": <level between 1 to 5 based on projects>}, ...],
    "summary": <short summary about the candidate profile, including their strong skiils taken from the projects they did, dont give more weightage to the summary written in resume.>,
    "predicted_designation": [<predicted designation of the candidate based on the projects they did.>],
    "predicted_experience": [<predicted experience of the candidate based on the projects they did.>],
    "predicted_salary": [<predicted salary of the candidate based on the projects they did with job profile and experience for bangalore, india.>],
  }

  
CRITICAL: 
- Return only JSON, no explanation
- Use exact field names as shown
- For missing info, use empty string "" or empty array []
- Skill levels: 1=Basic, 2=Novice, 3=Intermediate, 4=Advanced, 5=Expert
  Resume raw text: ${raw_text}
      `;
  return prompt;
};

export default promptText;
