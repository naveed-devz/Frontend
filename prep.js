// call apply bind


// let person = {
//     fname:"naveed",
//     lname:"shaik",
//     fullname:function(){
//         return   this.fname + this.lname ;
//     }
// }
// let person2 = {
//     fname:"jhon",
//     lname:'doe'
// }

// // console.log(person.fullname.call(person2))
// // console.log(person.fullname.apply(person2,["hi" , "hello"]))
// const bindMethod = person.fullname.bind(person2);

// console.log(bindMethod());



// shallow copy ---> original array toplevel prepoerties wont be affected but nested will be updated when we update the copied obj

// let obj={
//     name:"naveed",
//     details:{
//         age:25
//     }
// }

// let obj2 = Object.assign({},obj);

// obj2.name="shaik";
// obj2.details.age=30

// console.log(obj,"original obj");
// console.log(obj2,"copied obj");

//deepcopy 


// let obj={
//     name:"naveed",
//     details:{
//         age:25
//     }
// }

// let obj2 = JSON.parse(JSON.stringify(obj));

// obj2.name ="shaik";
// obj2.details.age=30;

// console.log("original",obj);
// console.log("copied",obj2);



//clousure


// function counter (){
//     let count = 0;

//     return{
//         increment:function(){count++
//             console.log(count);
//         },
//         decrement:function(){
//             count--
//             console.log(count)
//         }
//     }
// }

// const myCounter = counter();

// myCounter.increment();
// myCounter.increment();
// myCounter.decrement();


const  nums = [1, 2, 3, 4,1,2,9];

function unique(nums){
    let newNums = nums.sort((a,b) => a-b);
    let uni = [];
    for(let i=0;i<newNums.length;i++){
        if(newNums[i] !== newNums[i+1] && newNums[i] !== newNums[i-1]){
            uni.push(newNums[i])
        }
    }
return uni;
}
console.log(unique(nums))
