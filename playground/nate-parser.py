from PyPDF2 import PdfReader
import re
from datetime import datetime

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

# def is_date(str):
#     try:
#         parse(str)
#         return True
#
#     except ValueError:
#         return False

# text = re.sub('\d{4}-\d{2}-\d{2}', '', text).strip()
class Date:
    def __init__(self, date, type):
        self.date = date
        self.type = type
dates = []
for line in contents.split("\n"):
    # Type 1 is Dec 29, Sep 2, Nov 4 for example
    if re.search(r"Jan|Feb|Mar|Apr|May|Jun|Aug|Sep|Oct|Nov|Dec| \. (\d+)", line):
        dates.append(Date(line, 1))
    # Type 2 is mm-dd
    elif re.search(r"\d{2}-\d{2}", line):
        dates.append(Date(line, 2))
    # Type 3 is mm/dd
    elif re.search(r"\d{2}\\\d{2}", line):
        dates.append(Date(line, 3))
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
perfect_dates = []
# "Asaignemnt Dec 29"
def getDate(date):
    if date.type == 3:
        return date
    orig = ""
    date_str = date.date
    for month in months:
        if month in date_str:
            new_date = date_str.split(month)
            orig = new_date[0]
            date_str = month + new_date[1]
    if date.type == 1:
        perfect_date = datetime.strptime(date_str, '%b %d').date()
        return orig + perfect_date.strftime("%m/%d")
    perfect_date = datetime.strptime(date_str, '%b-%d').date()
    return orig + perfect_date.strftime("%m/%d")
for date in dates:
    orig = getDate(date)
    perfect_dates.append(orig)
print(perfect_dates)
#print(page.extract_text())
