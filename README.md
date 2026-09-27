# Simple Calculator — COU3303

## Run
Open calculator/index.html in a browser. No installation is needed.
Use the number buttons, choose +, −, × or ÷, enter the second number, then =.
AC clears everything. Backspace deletes a digit. ± changes the current sign.
% divides the current number by 100. The sun/moon button changes the theme.
Keyboard: digits, decimal point, +, -, *, /, %, Backspace, Enter or =; Escape clears.

## Defined behavior
Calculations run left to right: 2 + 3 × 4 = 20. This is a basic sequential calculator.
Results use up to 12 significant digits. Input is limited to 12 digits.
Repeated equals keeps the result. A digit after equals starts a new calculation.
A replacement operator before the next number replaces the pending operation.
Division by zero shows an error; entering a new number starts again.

## Testing and submission
Use testing/Calculator_Manual_Test_Cases_v1.1.xlsx for this keypad version.
The original workbook is for the old form interface and must not be used for v1.1.
Fill in student details, browser, date and GitHub URL. Run each case in the browser,
record actual results and choose Pass/Fail. Save failure screenshots in evidence/.
Preserve failures and record retest results after real fixes; do not invent bugs.
Upload the initial version to GitHub before testing changes, then commit real fixes
and improvements. Submit the completed Excel workbook through LMS.

## Versions
calculator-v1-backup/ preserves the previous form-based interface locally.
calculator/ contains v1.1, redesigned with a keypad following the supplied reference.
This local backup does not replace GitHub commit history.

Automated checks passed for 20 keypad state sequences. Browser smoke checks confirmed
addition and both themes. These checks do not complete the student's manual test record.
