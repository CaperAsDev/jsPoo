const caper = {
  name: 'caper',
  age: 27,
  approvedCourses: ['curso1',],
  addCourse(newCourse){
      this.approvedCourses.push(newCourse);
  }
};

//!Metodo para definir propiedades con atributos especificos que definen su comportamiendo (editable, listable, configurable)
Object.defineProperty(caper, "mail", {
  value: "caperactus@gmail.com",
  writable:false,
  enumerable:true,
  configurable:true
})

Object.defineProperty(caper, "twitter", {
  value: "caperactus",
  writable:true,
  enumerable:false,
  configurable:true
})

Object.defineProperty(caper, "platziPoints", {
  value: 13.828,
  writable:true,
  enumerable:true,
  configurable:false
})

Object.defineProperty(caper, "gender", {
  value: "male",
  writable:false,
  enumerable:false,
  configurable:false
})

//!Metodos estaticos

Object.seal(caper);
Object.freeze(caper);

/* console.log(Object.keys(caper));
console.log(Object.getOwnPropertyDescriptors(caper));
console.log(Object.getOwnPropertyNames(caper));
console.log(Object.entries(caper)); */


/* 
!Cómo copiar objetos en JS
*/

const obj1 = {
  a: "a",
  b: "b",
  c: {
    d: "d",
    e: "e"
  },
  f: ["♑️", "💀", "☯️", "💻"],
  g: () => {
    console.log(this);
    console.log("hi i'm a method in 'g'");
  },
  h: [1,2,3,{cuatro: '4', editA: () =>{this.a = 'AAAAA'}}]
};

const obj2 = {};

//?Este metodo de copia se llama Shadow copy pero no funciona con objetos contenidos dentro de porpiedades.
//* la propiedad 'c' que contiene el objeto con 'd' y 'e' al copiarse, copia la referencia mas no el valor de ese objeto lo que hace que este conectados entre si, no es una copia independiente.
for(prop in obj1) {
  obj2[prop] = obj1[prop];
}
/* console.log(obj1);
console.log(obj2); */

const obj3 = Object.assign({}, obj1) //?Pasa lo mismo que con el for.
const obj4 = Object.create(obj1)


/* 
!Usando JSON.stringify y JSON.parse para copiar el objeto
 */
//?Este metodo funciona siempre y cuando el objeto no incluya funciones/metodos ya que JSON no trabaja con funciones asi que simplemente las ignora.
const obj5 = JSON.stringify(obj1);

// console.log(obj5);

const obj6 = JSON.parse(obj5);
// console.log(obj6); 


/* 
!Ahora usaremos la recursividad para copiar objetos con metodos incluidos
 */
//?Como funciona:
function recursiva(array){
  if (array.length !== 0) {
    const firstNum = array[0];
    array.shift();
    console.log(firstNum);
    recursiva(array);
  }
}
let nums = [1,2,3,4,5,6,7,8,9,10,11]
// console.log(recursiva(nums));
/* let num = 0;
for (let index = 0; index < nums.length; index++) {
  const num = nums[index];
  console.log({index, num});
  
} */

//?aplicandola a obj1
function isObject(subject){
  return typeof subject === 'object' && subject!== null;
}
function isArray(subject){
  return Array.isArray(subject);
};

function deepCopy(subject){
  let copySubject;

  const subjectIsArray = isArray(subject);
  const subjectIsObject = isObject(subject);

  if (subjectIsArray) {
    copySubject = [];
    
  }else if(subjectIsObject){
    copySubject = {};
  }else{
    return subject;
  }

  for (let prop in subject) {
    // debugger;
    const keyIsObject = isObject(subject[prop]);

    if (keyIsObject) {
      copySubject[prop] = deepCopy(subject[prop]);
      }else{
        if (subjectIsArray) {
          console.log(prop);
          copySubject.push(subject[prop]);
        } else {
          copySubject[prop] = subject[prop];
        }
      }
  }


  return copySubject;
}

/* 
!Haciedo Moldes sin prototipos
?REcuerda que los prototipos son clases como las echas anteriormente, Asi que trabajar sin prototipos se refiere a hacer simplemente un objeto base( sin valores) que luego sera copiado y editado segun la "instancia" creada a partir de esta base. De esta manera los objetos literales creados seran instancias del super prototipo Objeto pero de ningun otro mas.
 */

const studentBase = {
  name:undefined,
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: {
    twitter: undefined,
    facebook: undefined,
    instagram: undefined,
  },
  
};

const juanito = deepCopy(studentBase);

Object.seal(juanito)//ninguna propiedad de juan se podra borrar

Object.isSealed(juanito); //retorna un boolean si todas las propiedades del objeto tienen su configurable en false
Object.isFrozen(juanito);//retorna un boolean si todas las propiedades del objeto estan protegidas contra delete o edicion

Object.defineProperty(juanito, 'name',{
  value : 'Juan',
  configurable: false,//no se podra borrar esta propiedad
})


/* 
!factory Pattern y RORO
? Recive an Object Return an Object
*Fabricas de objetos
*/
function requiredParam (param){
  throw new Error(param + ' es obligarotio.');
}

function createStudent ({
  name = requiredParam('name'),
  age, 
  email = requiredParam('email'),
  approvedCourses = [],
  learningPaths = [],
  twitter,
  facebook,
  instagram,
} = {} ){
  const private = {
    '_name': name,
    '_learningPaths': learningPaths,
    
  };

  const public = {
    age,
    email,
    socialMedia:{
      twitter,
      instagram,
      facebook,
    },
    approvedCourses,
    get name(){
      return private['_name'];
    },
    set name(newname){
      if(newname.lenght != 0){
        private['_name'] = newname;
      }else{
        console.warn('Tu nombre debe tener al menos un caracter')
      }
    },
    get learningPaths(){
      return private['_learningPaths'];
    },
    set learningPaths(newlearningPaths){
      if(!newlearningPaths.name){
        console.warn('Tu learningPath no tiente nombre');
        return;
      }
      if(!newlearningPaths.courses){
        console.warn('Tu learningPath no tiene courses');
        return;
      }
      if(!isArray(newlearningPaths.courses)){
        console.warn('Tu learningPath no es una lista');
        return;
      }
      private['_learningPaths'].push(newlearningPaths);
    },
  };
//?Protegemos nuestros metodos para que no se puedan editar
/*   Object.defineProperty(public, 'readName', {
    writable: false,
    configurable: false,
  });

  Object.defineProperty(public, 'changeName', {
    writable: false,
    configurable: false,
  }); */

  return public
};

/* 
!Funcion para crear learning paths
 */

function createLearningCourses({
  name = requiredParam('name'),
  courses = [],
}){
  const private = {
    '_name' : name,
    '_courses' : name,
  };
  const public = {
    get name(){
      return private['_name'];
    },
    set name(newname){
      if(newname.lenght != 0){
        private['_name'] = newname;
      }else{
        console.warn('Tu nombre debe tener al menos un caracter')
      }
    },
    get courses(){
      return private['_courses'];
    },

  };
  
  return public;
};


/* 
!Prototype para crear learning paths y student
 */

function StudentX({
  name,
  learningPaths,
  age,
  email,
  twitter,
  instagram,
  facebook,
  approvedCourses,
}){
  this.name = name;
  this.age = age;
  this.email = email;
  this.socialMedia = {
    twitter,
    instagram,
    facebook,
  };
  this.approvedCourses = approvedCourses;

  const privado = {
    '_learningPaths' : [],
  };

  Object.defineProperty(this, 'learningPaths', {
    get(){
      return privado['_learningPaths'];
    },
    set(newLP){
      if (newLP instanceof LearningPath) {
        privado['_learningPaths'].push(newLP);
      }else{
        console.warn('El LP no es una instancia del prototiopo esperado')
      };
    },
  });

  for (const lpindex in learningPaths) {
    this.learningPaths = learningPaths[lpindex]
  };
};

function LearningPath({
  name = requiredParam('name'),
  courses = [],
}){
  this.name = name;
  this.courses = courses;
}


const escuelaDiseño = new LearningPath({
  name: 'Escuela de Diseño',
})

const escuelaVideoGames = new LearningPath({
  name: 'Escuela de Video Juegos',
})

const anzu = new StudentX({
  name: 'Anzu',
  age: '17',
  email: 'anzuMegaWaifu@otaku.freak',
  learningPaths : [
    escuelaDiseño,
    escuelaVideoGames,
    {
      name: 'Escuela de irse a mimir'
    }
  ],
});