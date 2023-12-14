import { PrismaClient } from '@prisma/client';
import { server,success,failed} from "../../Config/config.js"

const prisma = new PrismaClient();

const findExitId= async (id)=>{
    try{
        const isExit = await prisma.booking.findUnique({
            where:{
                IDnum : +id
            }
        })
        if(!isExit){
            return true;
        }
        return false;
    }catch(err){
        console.log(err);
    }
}

const findById= async (id)=>{
    try{
        const isExit = await prisma.booking.findUnique({
            where:{
                IDnum : +id
            }
        })
        if(isExit){
            return isExit;
        }
        return null;
    }catch(err){
        console.log(err);
    }
}


const getAllBooking = async(req,res)=>{
    try{
        const list = await prisma.booking.findMany({
            where:{
                isDeleted: null
            }
        });
        success(res,list,"Thanh cong !");
    }catch(err){
        console.log(err);
        server(res);
    }
}

const sendBooking = async (req,res) => {
    try{
        const {name,dayOfBirth,idNum,phone,location,numDays,dateDep} = req.body;
        console.log("54",req.body)
        const isExit = await findExitId(idNum);
        if(isExit){
            const postBooking = await prisma.booking.create({
                data:{
                    nameF : name,
                    dateOfB: dayOfBirth,
                    IDnum: idNum,
                    location: location,
                    phone: phone,
                    dateOfDepart: dateDep,
                    numOfDays: numDays
                }
            })
            const responseData = {
                status: "success",
                data : postBooking,
            }
            success(res,responseData,"Booking thanh cong!");
        }else{
            failed(res,"That bai! trung ID");
        }
    }catch(err){
        console.log(err)
        server(res);
    }
}

const deleteBooking = async (req,res)=>{
    try{
        const {idNum} = req.params;
        const isExits = await findExitId(idNum);
        if(!isExits){
            const list = await prisma.booking.update({
                where:{
                    IDnum : +idNum
                },
                data:{
                    isDeleted: new Date()
                }
            })
            success(res,list,"Xoa thanh cong !");
        }else{
            failed(res,"That bai! Khong tim thay ID !");
        }
    }catch(err){
        server(res);
    }
}


const updateBooking = async (req,res) => {
    try{
        const {idNum} = req.params;
        const {name,dayOfBirth,phone,location,numDays,dateDep} = req.body;
        const exitsObject = await findById(idNum);
        if(exitsObject){
            const list = await prisma.booking.update({
                where:{
                    IDnum: +idNum
                },
                data:{
                    dateOfB: dayOfBirth,
                    dateOfDepart: dateDep,
                    IDnum: exitsObject.IDnum,
                    location: location,
                    nameF: name,
                    numOfDays: numDays,
                    phone: phone
                }
            })
            success(res,list,"Cap nhat thanh cong !")
        }else{
            failed(res,"Khong thay ID !")
        }
    }catch(err){
        console.log(err)
        server(res);
    }
}

const findBookingByName = async (req,res) => {
    try{
        const {keyword} = req.body;
        const result = await prisma.booking.findMany({
            where:{
                nameF:{
                    contains: keyword
                }
            }
        })
        success(res,result,"Ket qua hien thi"); 
    }catch(err){
        server(res);
    }
}

const findBookingByID = async (req,res) => {
    try{
        const {idNum} = req.params;
        const result = await findById(idNum);
        if(result){
            success(res,result,"Tim thay"); 
            return 0;
        }
        failed(res,"Khong tim thay!");
    }catch(err){
        server(res);
    }
}

    
export {
    getAllBooking,
    sendBooking,
    deleteBooking,
    updateBooking,
    findBookingByName,
    findBookingByID
}
