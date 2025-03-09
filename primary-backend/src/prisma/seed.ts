import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function user(){
    await prismaClient.user.create({
        data:{
            name:"akash",
            username:"akash@gmail.com",
            password:"123random"
        }
    })
}

async function admin(){
    await prismaClient.admin.create({
        data:{
            companyName:"akashenterprice",
            username:"akashpvt@gmail.com",
            password:"123random"
        }
    })
}

async function main(){
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    await prismaClient.product.create({
        data:{
            productName:"Cabbage",
            productCategory:"Fruits & Vegetables",
            productPrice:30,
            stock:50,
            companyId:"e2608d67-37d0-431b-af30-9b190d8ff264",
            productImg:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
            stockStatus:"INSTOCK"
        }
    })
    
}
main()
// user()
// admin()