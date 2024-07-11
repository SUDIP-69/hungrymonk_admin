import connDB from "../../../middleware/connDB";
import CompletedOrders from "../../../model/CompletedOrders";
import Orders from "../../../model/Orders";

const handler=async(req,res)=>{
    if(req.method==='POST'){
        try {
            console.log(req.body)
            const{order_id,cgst,sgst,discountpercent,discountdescription}=req.body;
            const order=await Orders.findOne({order_id});
            let billno;
            if(order){
                const lastUpdatedDocument = await CompletedOrders.findOne().sort({ updatedAt: -1 }).exec();
                console.log(lastUpdatedDocument);
                if(lastUpdatedDocument)
                {
                    billno=parseInt(lastUpdatedDocument.bill_no)+1;
                }
                else{
                    billno=1;
                }
                console.log(order.initial_bill,discountpercent)
                const discountamount=(0.01*(parseFloat(order.initial_bill)*parseFloat(discountpercent))).toFixed(2);
                const amountafterdiscount=(parseFloat(order.initial_bill)-parseFloat(discountamount)).toFixed(2);
                console.log(amountafterdiscount)
                const u={
                    bill_no:billno,
                    order_id:order.order_id,
                    customer_id:order.customer_id,
                    restaurant_id:order.restaurant_id,
                    table_number:order.table_number,
                    order_items:order.order_items,
                    total_quantity:order.total_quantity,
                    initial_bill:order.initial_bill,
                    cgstamount:cgst,
                    sgstamount:sgst,
                    tax:order.tax,
                    discountpercent:discountpercent,
                    discountamount:discountamount,
                    discount_description:discountdescription,
                    total_bill:amountafterdiscount,
                }
                const confirmorder= new CompletedOrders(u);
                const result=await confirmorder.save();
                console.log(result);
                
                if(result){
                    const a=await Orders.findOneAndDelete({order_id});
                    if(a){
                        res.status(200).json({success: true,data:result})
                    }
                    else{
                        res.status(401).json({success: false,error:"Couldn't delete order from current list"})
                    }
                }
                else{
                    res.status(401).json({success: false,error:"Couldn't generate bill"})
                }
            }
            else{
            res.status(401).json({success: false,error:"Not Found"})
            }
        } catch (error) {
            res.status(400).json({success: false,error:"Not Found"})
        }
    }
    else{
        res.status(400).json({success: false,error:"Method Not Allowed"})
    }
}

export default connDB(handler);