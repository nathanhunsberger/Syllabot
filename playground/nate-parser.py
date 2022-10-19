from PyPDF2 import PdfReader
import re

reader = PdfReader("../tests/MATH 3670 Syllabus.pdf")
page = reader.pages[0]
contents = page.extract_text()
#locates required content
contents = re.sub(r"[Jj]anuary", "Jan", contents)
contents = re.sub(r"[Ff]ebruary", "Feb", contents)
contents = re.sub(r"[Mm]arch", "Mar", contents)
contents = re.sub(r"[Aa]pril", "Apr", contents)
contents = re.sub(r"[Mm]ay", "May", contents)
contents = re.sub(r"[Jj]une", "Jun", contents)
contents = re.sub(r"[Jj]uly", "Jul", contents)
contents = re.sub(r"[Aa]ugust", "Aug", contents)
contents = re.sub(r"[Ss]eptember", "Sep", contents)
contents = re.sub(r"[Oo]ctober", "Oct", contents)
contents = re.sub(r"[Nn]ovember", "Nov", contents)
contents = re.sub(r"[Dd]ecember", "Dec", contents)

dates = re.findall(r"[A-Z].{2,5}.[0-9]\b|[0-9]{1,2}.[A-Z][a-z]{2,5}.[0-9]{4}\b|[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}|[0-9]{4}.[0-9]{1,2}.[0-9]{1,2}", contents)
print(dates)
print(page.extract_text())
