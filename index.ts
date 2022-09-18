// Tất cả các cú pháp ES6 đều chạy trên typescript

//Type: Kiểu dữ liệu của biến

/**
 * primitive type: number, string, boolean, undefined, null
 * reference type: prototype, object
 */

let number:number = 1
let hoTen:string = 'Quách Khải'
let valid:boolean = true
let udf: undefined=undefined
let ob:null = null

//reference type : không new được
//type: Tạo ra 1 kiểu dữ liệu cho biến

type Product = {
    id:number,
    price:number,
    name:string,
    // des?:string : optional property
}

let prod1:Product = {id:1,name:'phone1',price:1000}

// type Chuoi = string;
// let hoTen1:Chuoi= 'abc'

//interface: Dùng để định dạng dữ liệu cho biến tương tự type nhưng nhiều tính năng hơn

interface SinhVien {
    maSinhVien:string | number,
    tenSinhVien:string,
    lopHoc:string
}

//Merge: Các interface cùng tên thì tự động merge lại khi biên dịch

interface SinhVien{
    tuoi?:number
}

//Kế thừa: (extend) : interface có khả năng kế thừa từ interface khác

interface SinhVienKeToan extends SinhVien{
    cmnd:string
}

let sv:SinhVien = {maSinhVien:'1',tenSinhVien:'Nguyễn Văn A',lopHoc:'BC30'}
let svKT:SinhVienKeToan = {maSinhVien:'1',tenSinhVien:'Nguyễn Văn A',lopHoc:'BC30',cmnd:'123'}

//Giả sử server trả về 1 trong các kiểu dữ liệu sau: SinhVien |undefined|null
//union type

type ResultType = SinhVien | undefined | string |null

let result:ResultType = {maSinhVien:'1',tenSinhVien:'Nguyễn Văn A',lopHoc:'BC30'}

//any type, unknown type : có thể nhận tất cả kiểu dữ liệu khác

let student:any = '1'

class ProductClass {
    id: number | string ='';
    name:string='';
    constructor(){

    }
    showInfo(){
        console.log('id',this.id);
        console.log('name',this.name);
        
    }
}

let prod5:ProductClass = new ProductClass()
prod5.id = 1
prod5.name = 'phone 1'
prod5.showInfo()

// let prod6:ProductClass | undefined=undefined;

// //operation: toán tử gọi hàm
// prod6.showInfo()
//unknown giống any cho tất cả dữ liệu, tuy nhiên khi thực hiện operation thì phải kiểm tra type

let prod7:unknown = prod5
if(prod7 instanceof ProductClass){
    prod7.showInfo()
}
if(typeof prod7 === 'number'){
    prod7++
}


//type:Array | 

let arrNumber:number [] = [1,2,3,4]
let string123:string[]=['1','2']

let arrSinhVien:SinhVien[]=[
    {maSinhVien:'1',tenSinhVien:'Quach Khai',lopHoc:'BC30'},
    {maSinhVien:'1',tenSinhVien:'Quach Khai',lopHoc:'BC30'},
    {maSinhVien:'1',tenSinhVien:'Quach Khai',lopHoc:'BC30'}
]


//type: function



let tinhTong = (a:number,b:number):number=>{

    return a+b

}

let sayHello = (mess):string =>{
return mess
}


type CallBackFunction = (a: number, b: number) => number

function main (callback:CallBackFunction ){
    callback(1,2)

}

//tuple: mảng hỗn hợp [state,setState]
 
// let [num,setNumber]:[number,(oldNumber:number)=>number] = [1,function(num){return num}]

//interface còn được thể hiện như 1 class trừu tượng trong ts

interface CRUD {
    create:(ele)=>void,
    update:(id,ele)=>void,
    delete : (id)=>void,
    read:(keyword)=>any
}


class ProductList implements CRUD{
    create: (ele: any) => {

    }
    update: (id: any, ele: any) => {

    }
    delete: (id: any) => {

    }
    read: (keyword: any) => {

    }
    
}

let prodList:CRUD = {
    create: function (ele: any): void {
        throw new Error("Function not implemented.")
    },
    update: function (id: any, ele: any): void {
        throw new Error("Function not implemented.")
    },
    delete: function (id: any): void {
        throw new Error("Function not implemented.")
    },
    read: function (keyword: any) {
        throw new Error("Function not implemented.")
    }
}



//class access modifier (public,private,protected)
/**
 * public: là trong class, đối tượng(instance), class con (extends) có thể truy xuất được thuộc tính hoặc phương thức đó
 * private: chỉ có class đó sử dụng đc ( class con và đối tượng không thể truy xuất được thuộc tính hoặc phương thức đó)
 * protected: Class gốc và class con sử dụng được thuộc tính đó (instance thì không sử dụng được )
*/
class NhanVien {
    maNhanVien: string | number
    tenNhanVien: string =''
    protected heSoLuong:number = 1
    private luongCoBan: number = 0
    constructor (){

    }
    getHeSoLuong(){
        return this.heSoLuong
    }
    setLuongCoBan(luong:number){
        this.luongCoBan = luong
    }
    tinhLuong():number{
        return this.heSoLuong*this.luongCoBan;
    }

}
class NhanVienKeToan extends NhanVien{
    showInfo (){
        this.getHeSoLuong
    }
}

let nv:NhanVien = new NhanVien()
nv.maNhanVien = 1
nv.tenNhanVien = 'Quach Khai'
// nv.heSoLuong = 1
nv.setLuongCoBan(1000) 

console.log('luongCB',nv.tinhLuong());

let nvKT = new NhanVienKeToan()

//Generic type: cho phép truyền type khi sử dụng 1 class hoặc object

class List<T>{
    result: T[]
    insert(item:T){
        this.result.push(item)
    }
    update(id:number|string,itemUpdate:T){
        let item = this.result.filter((it:any)=>it.id===id )
        if(item.length>0){
            let itemInResult = item[0]
            for(let key in itemInResult){
                itemInResult[key] = itemUpdate[key]
            }
        }
    }
    delete(id:number|string){
        for(let index in this.result){
            let product:any = this.result[index]
            if(product.id===id){
                this.result.splice(Number(index),1)
            }
        }
    }
}


// let arrProduct:Product[]=[
//     {id:1,name:'product1',price:1000},
//     {id:2,name:'product2',price:2000},
//     {id:3,name:'product3',price:3000}
// ]

interface Student {
    id:number,
    name:string,
    age:number
}



let productList:List<Product> = new List<Product>()
productList.result=[
    {id:1,name:'product1',price:1000},
    {id:2,name:'product2',price:2000},
    {id:3,name:'product3',price:3000}
]
productList.delete(2)

console.log('productList',productList);


let studentList:List<Student>= new List<Student>()
studentList.result = [
    {id:7,name:'Quang',age:10},
    {id:8,name:'Huy',age:20},
    {id:9,name:'Lam',age:30}
]

studentList.delete(9)
studentList.update(8, {id:8,name:'Thang',age:50})
console.log('studentList',studentList.result);


//utility type
//ReturnType


let sayHelloCyber =():string|number|undefined=>{
    return 'Hello'
}

type StringResultType = ReturnType<typeof sayHelloCyber>

let stringResult:StringResultType = 'string'

let dispatchFunction = (params)=>{
    return dispatch =>{
        const action = {}
        dispatch(action)
    }
}

type DispatchAction = ReturnType <typeof dispatchFunction>

// let dispatch:DispatchAction = useDispatch()

const STATUS_CODE = {
    ACTIVE:1,
    INACTIVE:2
}

enum STATUS {ISACTIVE=1,INACTIVE=2}

//STATUS.ISACTIVE