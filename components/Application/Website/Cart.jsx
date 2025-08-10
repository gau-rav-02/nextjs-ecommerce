import { BsCart3 } from "react-icons/bs";

const Cart = () => {
  return (
    <button type='button' className="text-gray-500 hover:text-primary cursor-pointer">
        <BsCart3 size={25}/>
    </button>
  )
}

export default Cart