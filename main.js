function Student(name, age, cursosAprobados) {
  this.name = name;
  this.age = age;
  this.cursosAprobados = cursosAprobados;
}
Student.prototype.aprobarCurso = function (nuevoCurso) {
  this.cursosAprobados.push(nuevoCurso);
};

//? Esto es una instancia del prototipo Student 
const caper = new Student("Caper", 27, ["asincronismo con JS", "Consumo de API REST con JS"]);

//? Prototipo con sintaxis de clase
//*Puedo enviar mis parametros dentro de unas llaves con el formato de objetos, asi evito preocuparme por el orden 
class Student2{
  constructor({name, age, cursosAprobados}){
    this.name = name;
    this.age = age;
    this.cursosAprobados = cursosAprobados;
  }
  aprobarCurso(nuevoCurso){
    this.cursosAprobados.push(nuevoCurso);
  }
};
//* Al pasarle los argumentos debo pasarlos en formato de objeto asi evito preocuparme por el orden
const capiCode = new Student2({
  age: 28, 
  cursosAprobados: ['curso de ilustration', 'curso de diseño de personajes'],
  name:'CapiCode', 
});

//!Clase 7
//?Usando objetos literales (Mala practica y poco escalables)
const juan1 = {
  name: 'Juan',
  age: 26,
  points: 100,
  socialMedia: {
    twitter: 'juandc',
    instagram: 'juandc',
    youtube: 'juandc',
    facebook: 'juandc',
  },
  approvedCourses: [
    'curso definitivo de html y css',
    'curso practico de html'
  ],
  learningPaths:[
    {
      name: 'html',
      course: [
        'introduccion a html',
        'practica de html'
      ]
    },
    {
      name: 'videoJuegos',
      course: [
        'introduccion a unreal',
        'practica de Unity'
      ],
    },
  ],
};
const miguel1 = {
  name: 'Miguel',
  age: 32,
  points: 1000,
  socialMedia: {
    twitter: 'miguelito',
    instagram: 'miguelito',
    youtube: 'miguelito',
    facebook: 'miguelito',
  },
  approvedCourses: [
    'curso definitivo de html y css',
    'curso practico de html'
  ],
  learningPaths:[
    {
      name: 'dataScience',
      course: [
        'introduccion a dataScience',
        'practica de dataScience'
      ]
    },
    {
      name: 'marketing',
      course: [
        'introduccion a instagram',
        'practica de anuncios'
      ],
    },
  ],
};

//? usando clases para definir estructura de platzi

class Student3{
  constructor({
    name,
    age,
    email,
    cursosAprobados,
    twitter = undefined,
    facebook = undefined,
    instagram = undefined,
    youtube = undefined,
    approvedCourses = [],
    learningPaths = [],
    comentarios = [],
  }) {
    this.name =  name;
    this.age =     age;
    this.email =   email;
    this.comentarios = comentarios;
    this.cursosAprobados =     cursosAprobados;
    this.socialMedia = {
      twitter: twitter,
      instagram: instagram,
      facebook: facebook,
      youtube: youtube,
    };
    this.approvedCourses  =     approvedCourses;
    this.learningPaths  =     learningPaths;
  }

  publicarComentario(commentContent){
    const comment = new Comment({
      content: commentContent,
      user: this.name,
    });
    comment.publicar();
  }
}

//?Creando clases con herencia de la clase madre Student3

class FreeStudent extends Student3 {
  constructor(props){
    super(props);
  }

  approvedCourse(newCourse) {
    if (newCourse.isFree) {
      this.approvedCourses.push(newCourse)
    }else{
      console.warn('lo sentimos' +  this.name + ', solo puedes tomar cursos Gratuitos.')
    }
  }
}
class BasicStudent extends Student3 {
  constructor(props){
    super(props);

  }
  approvedCourse(newCourse) {
    if (newCourse.lang !== 'english') {
      this.approvedCourses.push(newCourse)
    }else{
      console.warn('lo sentimos' +  this.name + ', no puedes tomar cursos en ingles.')
    }
  }
}
class ExpertStudent extends Student3 {
  constructor(props){
    super(props);

  }
  approvedCourse(newCourse) {
    this.approvedCourses.push(newCourse)
  }
}
class TeacherStudent extends Student3 {
  constructor(props){
    super(props);

  }
  approvedCourse(newCourse) {
    this.approvedCourses.push(newCourse)
  }

  publicarComentario(commentContent){
    const comment = new Comment({
      content: commentContent,
      user: this.name,
      role: 'profesor'
    });
    comment.publicar();
  }
}



//? Construccion de clases para el learningPath 

class LearningPath{
  constructor({name, courses = []}){
    this.name = name;
    this.courses = courses;
  }
};

class Course{
  constructor({name, classes = [], teacher, isFree = false, lang = 'spanish',}){
    this._name = name;
    this.classes = classes;
    this.teacher = teacher;
    this.isFree = isFree;
    this.lang = lang;
  }

  get name(){
    return this._name;
  }

  set name(value){
    if (value !== undefined) {
      this._name = value;
    }
  }
};

function videoPlay(id){
  const urlSecretra = "https://api.youtube.com/" + id;
  console.log('Se esta resproduciendo desde la url' + urlSecretra);
};

function videoStop(id){
  const urlSecretra = "https://api.youtube.com/" + id;
  console.log('Se esta pausando desde la url' + urlSecretra);
};

class Lesson{
  constructor({
    tittle, 
    nextLessonID = undefined,
    previousLessonID = undefined,
    comentarios =[],
    recursos = undefined,
    videoID,
    profesor,
  }){
    this.tittle = tittle;
    this.nextLessonID = nextLessonID;
    this.previousLessonID = previousLessonID;
    this.comentarios = comentarios;
    this.recursos = recursos;
    this.videoID = videoID;
    this.profesor = profesor;
  }
  reproducir(){
    videoPlay(this.videoID);
  }
  pausar(){
    videoStop(this.videoID);
  }
};

class Teacher{
  constructor({
    name,
    cursos = [],
    comentarios = [],
    classes = [],
  }){
    this.name = name;
    this.cursos = cursos;
    this.classes = classes;
    this.comentarios = comentarios;
  }
};
class Comment{
  constructor({
    user,
    content,
    date,
    answers = [],
    attachment =[],
    likes = 0,
    role = 'estudiante',
    type
  }){
    this.user = user;
    this.content = content;
    this.date = date;
    this.attachment = attachment;
    this.answers = answers;
    this.likes = likes;
    this.role = role;
    this.type = type;
  }
  publicar(){
    console.log(this.user + ' ' + this.role);
    console.log(this.likes + 'likes');
    console.log(this.content);
  }

  newLike(){
    this.likes += 1;
  }
};

//!Instancias Cursos

const cursoProgramacion = new Course({
  name: 'Curso Programación Basica',
  isFree: true,
});

const cursoPracticoHTml = new Course({
  name: 'Curso Practico HTML y Css',
});
const cursoDefinitivoHTml = new Course({
  name: 'Curso Definitivo HTML y Css',
});
const cursoData = new Course({
  name: 'Curso de Data Business',
  lang: 'english',
});
const cursoDataviz = new Course({
  name: 'Curso de Dataviz',
});
const cursoUnity = new Course({
  name: 'Curso de Unity',
});
const cursoUnreal = new Course({
  name: 'Curso de Unreal',
});

//!Instancias de escuelas

const escuelaWeb = new LearningPath({
  name: 'Escuela Web',
  courses: [
    cursoProgramacion,
    cursoDefinitivoHTml,
    cursoPracticoHTml,
  ]
});
const escuelaData = new LearningPath({
  name: 'Escuela Data Science',
  courses: [
    cursoProgramacion,
    cursoData,
    cursoDataviz,
  ]
});
const escuelaVgs = new LearningPath({
  name: 'Escuela de videoJuegos',
  courses: [
    cursoProgramacion,
    cursoUnity,
    cursoUnreal,
  ]
});

//!Instancias Students

const juan2 = new FreeStudent({
  name: 'Juan',
  age: 26,
  email: 'juan@gmail.com',
  twitter: 'juan',
  learningPaths: [
    escuelaWeb,
    escuelaVgs
  ],
});
const miguel2 = new BasicStudent({
  name: 'Juan',
  age: 26,
  email: 'juan@gmail.com',
  twitter: 'juan',
  learningPaths: [
    escuelaWeb,
    escuelaData
  ],
});

const freddy = new TeacherStudent({
  name: 'Freddy',
  email: 'freddy@gmail.com',
  age: 35,
  twitter: 'freddy',
})