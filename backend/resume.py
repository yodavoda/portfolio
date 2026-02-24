from pathlib import Path

RESUME_FILE_PATH = Path(__file__).with_name("resume.txt")

DEFAULT_RESUME_CONTEXT = """
Name: Sriram Karthik Eunni
Email: eunnisriram@gmail.com
Phone: +916309130380
LinkedIn: https://www.linkedin.com/in/sriram-karthik-49a78722a/

EDUCATION:
- B.Tech in Computer Science, Manipal Institute of Technology, Manipal (Sept 2022 – June 2026)
- CBSE Senior Secondary, Bright Riders School, Abu Dhabi — 86.4%

TECHNICAL SKILLS:
- Programming Languages: C (proficient), Python (proficient), Java (good), ARM Assembly
- Web: HTML, CSS, JavaScript, Adobe XD
- Database: MySQL
- Tools: Adobe After Effects, Premiere Pro, MS Office (Word, PowerPoint, Excel)
- Key Subjects: Data Structures, Algorithms, OOP, DBMS, Digital Systems, Embedded Systems,
  Computer Networks, Operating Systems, Parallel Computing, Compiler Design, Automata Theory

PROJECTS & INTERNSHIPS:

1. Tridel Technology (Internship)
   - Conducted JUnit testing for reliability and performance of company software
   - Validated new features for ATTide software through structured test cases
   - Developed a Java + JUnit module to interpret and analyze ocean tide readings

2. Campus Connect (Flutter, Firebase)
   - Mobile app enhancing campus life by connecting students and faculty
   - Real-time event notifications using Firebase real-time database
   - Location-based services and peer reviews with sleek Flutter UI

3. Bank ATM Simulator (JavaFX, MySQL)
   - Fully functional ATM simulator: withdrawals, deposits, bill payments
   - JavaFX for UI, MySQL for secure transaction data management

4. BlackJack Simulator (Java)
   - Card game simulator mimicking real-world gameplay
   - Reinforced OOP principles and game development understanding

5. Security System (ARM Assembly, LPC 1768)
   - Engineered a security system on LPC 1768 microcontroller
   - Sensor-based real-time monitoring and alarm triggers for unauthorized access
   - Demonstrated low-level programming and hardware-software integration

KEY STRENGTHS:
- Problem Solving, Team Collaboration, Critical Thinking, Creativity, Learning Agility

ABOUT:
Sriram is a third-year Computer Science student at MIT Manipal with a strong foundation in
systems programming, embedded systems, and software development. He has hands-on experience
with internships, multiple full-stack and embedded projects, and a passion for learning new technologies.
"""


def get_resume_context() -> str:
    """Read resume context from resume.txt if present, otherwise fallback to default text."""
    if RESUME_FILE_PATH.exists():
        file_text = RESUME_FILE_PATH.read_text(encoding="utf-8").strip()
        if file_text:
            return file_text
    return DEFAULT_RESUME_CONTEXT.strip()


def get_resume_source() -> str:
    """Indicate where resume data is currently loaded from."""
    if RESUME_FILE_PATH.exists() and RESUME_FILE_PATH.read_text(encoding="utf-8").strip():
        return str(RESUME_FILE_PATH.name)
    return "embedded_default"


RESUME_CONTEXT = get_resume_context()
