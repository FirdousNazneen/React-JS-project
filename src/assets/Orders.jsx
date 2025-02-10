import { useSelector } from "react-redux"

function Orders()
{

    const purchasehistory=useSelector(state=>state.purchase);

    let finaldata=purchasehistory.map((purchase,index)=>(
        <li key={index}>
       <p>Date: {purchase.Date}</p>
       <p>Total amount:${purchase.price.toFixed(2)}</p>

       {/* all items are reading using map */}
       <ul>
        {purchase.items.map((items,itemindex)=>(
            <li key={itemindex}>

                {items.name} ..$ {items.price}
            </li>
        )
        )}
       </ul>
        </li>
    ))
    return(
<>
<h2>purchase history:</h2>

   { purchasehistory.length==0?
    (
        <h1>no purchase available</h1>
    )
    :
    (
        <ul>{finaldata}</ul>
    )
}
</>
    )
}
export default Orders;