from PyPDF2 import PdfReader
import re
from datetime import datetime
test1 = "../tests/MATH 3670 Syllabus With More.pdf"
test2 = "../tests/Syllabus_2022_FaLL_final.pdf"
reader = PdfReader(test2)
page = reader.pages[3]
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
        self.date_str = date
        self.type = type
        self.date = self.getDate()

    def getDate(self):
        if self.type == 3:
            return self.date_str
        date_str = self.date_str
        if self.type == 1:
            # for month in months:
            #     if month in date_str:
            #         new_date = date_str.split(month)
            #         orig = new_date[0]
            #         date_str = month + new_date[1]
            new_date = re.findall(r"(Jan|Feb|Mar|Apr|May|Jun|Aug|Sep|Oct|Nov|Dec) (\d+)", date_str)[0]
            new_date = new_date[0] + " " + new_date[1]
            orig = date_str.replace(new_date, "")
            perfect_date = datetime.strptime(new_date, '%b %d').date()
            return orig + perfect_date.strftime("%m/%d")
        elif self.type == 2:
            new_date = re.findall(r"\d{1,2}-\d{1,2}", date_str)[0]
            orig = date_str.replace(new_date, "")
            perfect_date = datetime.strptime(new_date, '%m-%d').date()
            return orig + perfect_date.strftime("%m/%d")
dates = []
for line in contents.split("\n"):
    # Type 1 is Dec 29, Sep 2, Nov 4 for example
    if re.search(r"(Jan|Feb|Mar|Apr|May|Jun|Aug|Sep|Oct|Nov|Dec) (\d+)", line):
        print(line)
        dates.append(Date(line, 1).date)
    # Type 2 is mm-dd
    elif re.search(r"\d{1,2}-\d{1,2}", line):
        dates.append(Date(line, 2).date)
    # Type 3 is mm/dd
    elif re.search(r" \d{1,2}/\d{1,2} ", line) or re.search(r"\d{1,2}/\d{1,2} ", line) or re.search(r" \d{1,2}/\d{1,2}", line):
        dates.append(Date(line, 3).date)
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

print(dates)
#print(page.extract_text())
