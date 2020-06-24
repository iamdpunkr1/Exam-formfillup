const form = document.getElementById('register');
const details = document.querySelector('.details');


const elem = document.querySelector('.modal');


form.addEventListener('submit', (e)=>{
    const arn = Math.floor(Math.random() * 1000) + 100;
    e.preventDefault();

      // get user info
  const email = form.email.value;
  const password = form.password.value;



  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('students').doc(cred.user.uid).set({
      rollNo: form.rollNo.value,
      reg: form.reg.value,
      name:form.name.value,
      guardian:form.gname.value,
      email:form.email.value,
      mobile:form.phone.value

    });
  }).then(() => {
    const html=`
    <br><br><div class="container"> <p><b>Name: ${form.name.value}<br>
     ARN(Application Reference No): ${arn}<br>
     </b></p>
      <p>Registration No: ${form.reg.value}<br>
         Roll No: ${form.rollNo.value}<br>
      </p>
      </div>    `;
     details.innerHTML=html;
     M.Modal.getInstance(elem).open();
    // close the signup modal & reset form
    form.reset();
    form.querySelector('.error').innerHTML = ''
  }).catch(err => {
    form.querySelector('.error').innerHTML = err.message;
  });



})


      //Print PDF
      const createPDF=(p) =>{
        html2canvas(document.getElementById(p), {
          onrendered: function (canvas) {
              var data = canvas.toDataURL();
              var docDefinition = {
                  content: [{
                      image: data,
                      width: 500
                  }]
              };
              pdfMake.createPdf(docDefinition).download("Table.pdf");
          }
      });
    }