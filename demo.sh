if [ -d $1 ]; then
 exit 
else
 mkdir $1
 cd $1
 mkdir css js
 touch index.html css/style.css js/main.js
 echo '<!DOCTYPE><title>Hello</title><h1>Hi</h1>' > index.html
 echo 'h1{color: red;}' > css/style.css
 newline=$'\n'
 echo 'var string = "Hello World"\n alert(string)' > js/main.js
 exit
fi