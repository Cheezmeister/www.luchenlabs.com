RESUME=b_luchen_resume
latex2html $RESUME.tex || exit 1
pdflatex $RESUME.tex || exit 1
mv $RESUME/$RESUME.html ..
mv $RESUME.pdf ..
rm *.log .log
rm -rf $RESUME/

