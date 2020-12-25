
//fonction qui permet la validation d'email  du prof ou d'etudiant celon la saisie //
function validateEmailStudentTeacher(email) {
  var n = email.includes("@dune-student.");
  var b = email.includes("@dune-teacher.");

  if (n === true) {
    return "student";
  } else if (b === true) {
    return "teacher";
  }
  else {
    alert("verify your email adress");
  }
}
// fonction signup pour eudiant et teacher selon l'email//
function signupStudentTeacher() {
  var firstName = document.getElementById("fName").value;
  var lastName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  var cpwd = document.getElementById("cpwd").value;
  var classe = document.getElementById("classe").value;
  var section = document.getElementById("section").value;
  var Ab = 0;
  var Pr = 0;

  if (verifLength(firstName, 3, 25)) {
    document.getElementById("fNameError").innerHTML = "";
  } else {
    document.getElementById("fNameError").innerHTML = "First Name Invalid";
    document.getElementById("fNameError").style.color = "red";
  }
  if (verifLength(lastName, 3, 25)) {
    document.getElementById("lNameError").innerHTML = "";
  } else {
    document.getElementById("lNameError").innerHTML = "Last Name Invalid";
    document.getElementById("lNameError").style.color = "red";
  }
  if (verifLength(pwd, 1, 1)) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password length must be > 8";
    document.getElementById("pwdError").style.color = "red";
  }
  if (pwd === cpwd) {
    document.getElementById("cpwdError").innerHTML = "";
  } else {
    document.getElementById("cpwdError").innerHTML =
      "Confirm Pwd must match Pwd";
    document.getElementById("cpwdError").style.color = "red";
  }
  if (verifLength(classe, 3, 25)) {
    document.getElementById("classeError").innerHTML = "";
  } else {
    document.getElementById("classeError").innerHTML = "verif classe";
    document.getElementById("classeError").style.color = "red";
  }
  if (verifLength(section, 3, 25)) {
    document.getElementById("sectionError").innerHTML = "";
  } else {
    document.getElementById("sectionError").innerHTML = "verif section";
    document.getElementById("sectionError").style.color = "red";
  }
  if (validateEmail(email)) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid Format";
    document.getElementById("emailError").style.color = "red";
  }
  var x = validateEmailStudentTeacher(email);
  if (validateEmail(email) &&
    verifLength(section, 3, 25) &&
    pwd === cpwd &&
    verifLength(pwd, 1, 1) &&
    verifLength(lastName, 3, 25) && verifLength(classe, 3, 25) &&
    verifLength(firstName, 3, 25)) {
    var identifiant = JSON.parse(localStorage.getItem("studentTeacherId") || "1");
    var studentTeacher = {
      id: identifiant,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      cpwd: cpwd,
      section: section,
      classe: classe,
      Ab: Ab,
      Pr: Pr,
      role: x
    }
    var allStudentsTeachers = JSON.parse(localStorage.getItem("key") || "[]");
    allStudentsTeachers.push(studentTeacher);
    localStorage.setItem("key", JSON.stringify(allStudentsTeachers));
    alert('signup successed');
    localStorage.setItem("studentTeacherId", identifiant + 1);
  } else {
    alert("Please verify !!!");
  }
}
//fonction login pour students et teacher //
function login() {
  var email = document.getElementById("emailLogin").value;
  var pwd = document.getElementById("pwdLogin").value;
  if (verifLength(email, 0, 0)) {
    document.getElementById("emailErrorLogin").innerHTML =
      "Please insert Email";
    document.getElementById("emailErrorLogin").style.color = "red";
  } else {
    document.getElementById("emailErrorLogin").innerHTML = "";
  }
  if (verifLength(pwd, 0, 0)) {
    document.getElementById("pwdErrorLogin").innerHTML =
      "Please insert Password";
    document.getElementById("pwdErrorLogin").style.color = "red";
  } else {
    document.getElementById("pwdErrorLogin").innerHTML = "";
  }
  {
    var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
    var student;
    for (var i = 0; i < allStudents.length; i++) {
      if (allStudents[i].email === email && allStudents[i].pwd === pwd) {
        student = allStudents[i];
      }
    }
  };
  if (student) {
    // stocker user ds  LS pour le récupérer après
    localStorage.setItem('connectStudent', JSON.stringify(student));
    //alert('yes');
    if (student.role === "student") {
      // Go to User Page
      location.replace("index.html");
    } else {
      // Go to Admin Page
      location.replace("dashProf.html");
    }
  } else {
    alert("Verify email/pwd");
  }
}
// la fonction signout permet la deconnexion pour connected student//
function signout() {
  localStorage.removeItem('connectStudent');
}
//la fonction helle Mr permet d'afficher le nom de connect student//
function helloMr() {
  var user = JSON.parse(localStorage.getItem('connectStudent'));
  if (user) {
    var helloMsg = `
    <a  class="small mr-3"><span class="icon-unlock-alt"></span> hello ${user.firstName}</a>
    <a href="register.html" onclick="signout()" class="small btn btn-primary px-4 py-2 rounded-0"><span class="icon-users"></span> sign out</a>`;
  } else {
    var helloMsg = `
    <a href="login.html" class="small mr-3"><span class="icon-unlock-alt"></span> Log In</a>
    <a href="register.html" class="small btn btn-primary px-4 py-2 rounded-0"><span class="icon-users"></span> Register</a>`;
  }
  document.getElementById('helloMrr').innerHTML = helloMsg;
}
// Verify Text Length between min and max//
function verifLength(ch, min, max) {
  return ch.length >= min && ch.length <= max;
}
// Validte Email format//
function validateEmail(email) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
//fonction qui permet de calculer le moyenne pour etudiant//
function calculMoy() {
  var phy = document.getElementById("nPhy").value;
  var math = document.getElementById("nMath").value;
  var info = document.getElementById("nInfo").value;
  if (phy < 0 || phy > 20) {
    document.getElementById("phyError").innerHTML =
      "Merci d'entrer une valeur de Physique entre 0 et 20";
  } else {
    document.getElementById("phyError").innerHTML = "";
  }
  if (math < 0 || math > 20) {
    document.getElementById("mathError").innerHTML =
      "Merci d'entrer une valeur de Math entre 0 et 20";
  } else {
    document.getElementById("mathError").innerHTML = "";
  }
  if (info < 0 || info > 20) {
    document.getElementById("infoError").innerHTML =
      "Merci d'entrer une valeur d'informatique entre 0 et 20";
  } else {
    document.getElementById("infoError").innerHTML = "";
  }
  if (phy < 0 || phy > 20 || math < 0 || math > 20 || info < 0 || info > 20) {
    document.getElementById("moyResult").innerHTML =
      "Impossible de calculer moyenne";
  } else {
    var moy = (Number(phy) * 3 + Number(math) * 2.5 + Number(info) * 3.5) / 9;
    document.getElementById("moyResult").innerHTML = moy;
  }
  if (moy >= 0 && moy <= 8) {
    document.getElementById("mentionResult").innerHTML = "Trop faible";
    document.getElementById("mentionResult").style.color = "red";
  } else if (moy > 8 && moy < 10) {
    document.getElementById("mentionResult").innerHTML = "Faible";
    document.getElementById("mentionResult").style.color = "purple";
  } else if (moy >= 10 && moy < 13) {
    document.getElementById("mentionResult").innerHTML = "Assez Bien";
    document.getElementById("mentionResult").style.color = "orange";
  } else if (moy >= 13 && moy < 16) {
    document.getElementById("mentionResult").innerHTML = "Bien";
    document.getElementById("mentionResult").style.color = "yellow";
  } else if (moy >= 16 && moy < 18) {
    document.getElementById("mentionResult").innerHTML = "Très Bien";
    document.getElementById("mentionResult").style.color = "#D2E603";
  } else if (moy >= 18 && moy <= 20) {
    document.getElementById("mentionResult").innerHTML = "Excellent";
    document.getElementById("mentionResult").style.color = "green";
  } else {
    document.getElementById("mentionResult").innerHTML = "Error";
    document.getElementById("mentionResult").style.color = "red";
  }
}
//fonction qui permet d'afficher la liste des etudiant//
function displayStudents() {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  var studentTable = `
                                          <table class="table table-bordered table-dark">
                                          <thead>
                                              <tr>
                                              <tr>
                                              <th scope="col"  class="text-center">name</th>
                                              <th scope="col"  class="text-center">email</th>
                                              <th scope="col"  class="text-center">classe</th>
                                               <th scope="col"  class="text-center">Nbre absent</th>
                                              <th scope="col"  class="text-center">Nbre present</th>
                                              
                                            </tr>
                                              </tr>
                                          </thead>
                                          <tbody>`;

  for (var i = 0; i < allStudents.length; i++) {
    if (allStudents[i].role === "student") {
      studentTable += `
                                              <tr>
                                                  <td scope="raw">
                                                      ${allStudents[i].firstName}
                                                  </td>

                                                  <td scope="raw">
                                                  ${allStudents[i].email}
                                                  </td>
                                                  <td scope="raw">
                                                      ${allStudents[i].classe}
                                                  </td>
                                                  <td scope="raw">
                                                      ${allStudents[i].Pr}
                                                      
                                                  </td>
                                                  <td scope="raw">
                                                      ${allStudents[i].Ab}
                                                  </td>
                
                                              </tr>`;
    }
  }
  studentTable += `
                                          </tbody>
                                      </table>
    `;

  document.getElementById("studentTable").innerHTML = studentTable;
}
//fonction qui  donne au prof l'acees de gerer l'absence et presence  //
function gererAbPr() {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  var studentTable = `
                                             <table class="table table-bordered table-dark">
                                               <thead>
                                              <tr>
                                              <tr>
                                              <th scope="col" class="text-center">name</th>
                                              <th scope="col" class="text-center">email</th>
                                               <th scope="col" class="text-center">Nbre present</th>
                                              <th scope="col" class="text-center">Nbre absent</th>
                                              
                                            </tr>
                                              </tr>
                                          </thead>
                                          <tbody>`;

  for (var i = 0; i < allStudents.length; i++) {
    if (allStudents[i].role === 'student') {
      studentTable += `
                                              <tr>
                                              
                                              <td scope="row">
                                                      ${allStudents[i].firstName}
                                                  </td>
                                                 
                                                  <td scope="row">
                                                  ${allStudents[i].email}
                                                  </td>
                                                  
                                                  <td scope="row"  class="text-center">
                                                  <button class="btn btn-success" onclick ='addAbsent(${allStudents[i].id})'>Present</button>
                                                  </td>
                                                  <td scope="row" class="text-center">
                                                  <button class="btn btn-danger" onclick ='addPresent(${allStudents[i].id})'>Absent</button>
                                                  </td>
                                              </tr>`;
    }
  }
  studentTable += `
                                          </tbody>
                                      </table>
    `;

  document.getElementById("gererABP").innerHTML = studentTable;
}
//fonction qui permet d'ajouter le nombre de presence //
function addAbsent(id) {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  for (i = 0; i < allStudents.length; i++) {
    if (allStudents[i].id === id) {
      allStudents[i].Ab++;
    };
  }
  localStorage.setItem("key", JSON.stringify(allStudents));
  location.reload();
}
//fonction qui permet d'ajouter le nombre d'absence //
function addPresent(id) {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  for (i = 0; i < allStudents.length; i++) {
    if (allStudents[i].id === id) {
      allStudents[i].Pr++;
    };
  }
  localStorage.setItem("key", JSON.stringify(allStudents));
}
//la fonction qui permet d'afficher les note de chaque etudiant//
function noteStudents() {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  var noteTable = `
                                        <table class="table table-bordered table-dark">
                                          <thead>
                                              <tr>
                                              <tr>
                                              <th scope="col" class="text-center">name</th>
                                              <th scope="col" class="text-center" >email</th>
                                              <th scope="col" class="text-center">affecter moyenne</th>
                                            </tr>
                                              </tr>
                                          </thead>
                                          <tbody>`;
  for (var i = 0; i < allStudents.length; i++) {
    if (allStudents[i].role === 'student') {
      noteTable += `
                                            <tr>
                                                  <td scope="row">
                                                      ${allStudents[i].firstName}
                                                  </td>
                                                 
                                                  <td  scope="row">
                                                  ${allStudents[i].email}
                                                  </td>
                                                  
                                                  <td  scope="row"  class="text-center">
                                                  <a href="note.html?idStudent=${allStudents[i].id}" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Donner Notes </a>
                                                  </td>
                
                                            </tr>`;
    }
  }
  noteTable += `
                                          </tbody>
                                      </table>
    `;

  document.getElementById("noteTable").innerHTML = noteTable;
}
//la fonction qui permet d'afficher le nombre d'absence et presence//
function displayAbPr() {
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");

  var abPrTable = `
                                        <table>
                                          <thead>
                                              <tr>
                                              <tr>
                                               <th scope="col">Nbre absent</th>
                                              <th scope="col">Nbre present</th>
                                             
                                              
                                            </tr>
                                              </tr>
                                          </thead>
                                          <tbody>`;

  for (var i = 0; i < allStudents.length; i++) {
    if (JSON.parse(localStorage.getItem("connectStudent")).id === allStudents[i].id) {
      abPrTable += `
                                              <tr>

                                                  <td class="table table-striped table-dark">
                                                      ${allStudents[i].Pr}
                                                      
                                                  </td>
                                                  <td class="table table-striped table-dark">
                                                      ${allStudents[i].Ab}
                                                  </td>
                                                 
                                              </tr>`;
    }
  }
  abPrTable += `
                                          </tbody>
                                      </table>
    `;

  document.getElementById("abPrTable").innerHTML = abPrTable;
}
//function go to student detail//
function goToStudentDetails(identifiant) {
  // Allocation d'une variable
  var student;
  // Get all users from LS
  var allStudents = JSON.parse(localStorage.getItem("key") || "[]");
  // Loop users one by one
  for (var i = 0; i < allStudents.length; i++) {
    // check if user id is equal to identifiant (getted from button click)
    if (allStudents[i].id === identifiant) {
      student = allStudents[i];
    }
  }
  // Send finded user to LS
  localStorage.setItem("findedStudent", JSON.stringify(student));
  // Go to display user page
  location.replace("display-student.html");
}
//fonction qui permet d'ajouter une note//
function addNote() {
  var noteMath = document.getElementById("noteM").value;
  var notePhysique = document.getElementById("noteP").value;
  var noteChimie = document.getElementById("noteC").value;
  var noteInfo = document.getElementById("noteI").value;
  //ay 7aja ba3ed .html tabda mil ? 
  const queryString = window.location.search;
  // bich ta3tik l authorization bich tista3mel fonction .get w t7ot fi wistha ay 7aja t7eb tjibha ba3ed  ?
  const urlParams = new URLSearchParams(queryString);
  /// jibna l valeur mta3  ili ba3ed l point ? ili howa idStudent
  var idStudent = urlParams.get('idStudent');
  //pr verifier qest ce que on va afficher apres html
  console.log(idStudent);
  if (notePhysique < 0 || notePhysique > 20) {
    document.getElementById("phyError").innerHTML =
      "Merci d'entrer une valeur de Physique entre 0 et 20";
  } else {
    document.getElementById("phyError").innerHTML = "";
  }
  if (noteMath < 0 || noteMath > 20) {
    document.getElementById("mathError").innerHTML =
      "Merci d'entrer une valeur de Math entre 0 et 20";
  } else {
    document.getElementById("mathError").innerHTML = "";
  }
  if (noteInfo < 0 || noteInfo > 20) {
    document.getElementById("infoError").innerHTML =
      "Merci d'entrer une valeur d'informatique entre 0 et 20";
  } else {
    document.getElementById("infoError").innerHTML = "";
  }
  if (noteChimie < 0 || noteChimie > 20) {
    document.getElementById("chimieError").innerHTML =
      "Merci d'entrer une valeur de chimie entre 0 et 20";
  } else {
    document.getElementById("chimieError").innerHTML = "";
  }
  {
    var noteId = JSON.parse(localStorage.getItem("noteId") || "1");
    var note = {
      id: noteId,
      noteMath: noteMath,
      notePhysique: notePhysique,
      noteChimie: noteChimie,
      noteInfo: noteInfo,
      idStudent: idStudent,
    };
    var allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    allNotes.push(note);
    localStorage.setItem("noteId", noteId + 1);
    localStorage.setItem("notes", JSON.stringify(allNotes));
    alert('notes Added');
  }
}
// la fonction qui permet d'afficher les notes//
function displayNotes() {
  var allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  var connectStudent = JSON.parse(localStorage.getItem("connectStudent"));
  var noteTable = `
                                          <table>
                                            <thead>
                                                <tr>
                                                <tr>
                                                 <th scope="col">Note Phy</th>
                                                <th scope="col">Note Math</th>
                                                <th scope="col">Note Chimie</th>
                                                <th scope="col">Note Info</th>
                                              </tr>
                                                </tr>
                                            </thead>
                                            <tbody>`;
  for (var i = 0; i < allNotes.length; i++) {
    if (connectStudent.id.toString() === allNotes[i].idStudent) {

      noteTable += `
                                                <tr>
                                                <td class="table table-striped table-dark">
                                                ${allNotes[i].notePhysique}
                                            </td>
                                            <td class="table table-striped table-dark">
                                            ${allNotes[i].noteMath}
                                        </td>
  
                                                    <td class="table table-striped table-dark">
                                                        ${allNotes[i].noteChimie}
                                                        
                                                    </td>
                                                    <td class="table table-striped table-dark">
                                                        ${allNotes[i].noteInfo}
                                                        
                                                    </td>
                                                   
                                                 </tr>`;
    }
  }
  noteTable += `
                                            </tbody>
                                        </table>
      `;

  document.getElementById("noteTable").innerHTML = noteTable;
}