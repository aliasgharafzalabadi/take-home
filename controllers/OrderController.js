const Order = require("../models").Order;
const jsPDF = require("jspdf");

class OrderController {
    async getOrders(req , res){
        try{
            const orders = await Order.findAll({
                where : {userID : req.user.user_id}
            })

            res.status(201).json(orders)
        }
        catch (e){
            res.status(500).send({message : e.message});
        }
    }
    async createOrder (req , res){
        try{

            let data = {
                productName : req.body.product_name,
                quantity : req.body.quantity,
                pricePerUnit : req.body.price_per_unit,
                userID : req.user.user_id,
            }

           await Order.create(data);
           res.status(201).json({message : "با موفقیت ایجاد شد"})
        }
        catch (e){
            res.status(500).send({message : e.message});
        }
    }

    async updateOrder(req , res){
        try{
            let data = {
                productName : req.body.product_name,
                quantity : req.body.quantity,
                pricePerUnit : req.body.price_per_unit,
            }

            await Order.update(data , {
                where : {id : req.params.id}
            })

            res.status(201).json({message : "به روز رسانی شد"});
        }
        catch (e){
            return res.send({message : e.message})
        }
    }

    async deleteOrders(req , res){
        try{
            await Order.destroy({
                where : {id : req.params.id}
            })

            res.status(201).json({message : "با موفقیت انجام شد"})
        }
        catch (e){
            res.status(500).send({message : e.message})
        }
    }

    async getOrdersPDF(req , res){
        try{
            const doc = new jsPDF();
            const orders = await Order.findAll({
                where : {userID : req.user.user_id}
            });

            doc.text(50, 10 , req.user.firstName + " " + req.user.lastName + " : ")

            JSON.stringify(orders).array.forEach(element , i => {
                doc.text(50 , 10 + (i *10), 
                "name : " + element.productName +
                "quantity : " + element.quantity + 
                "pricePerUnit : " + element.pricePerUnit
             )

             const pdf = doc.save(' list_of_orders')

             return pdf;

            });

        }
        catch(e) {

        }
    }
}

module.exports = new OrderController();