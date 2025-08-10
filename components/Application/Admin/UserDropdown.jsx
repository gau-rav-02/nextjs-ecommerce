import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import adminLogo from '@/public/assets/images/admin-logo.png';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { IoAddCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { showToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { logout } from "@/store/reducer/authReducer";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";




const UserDropdown = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state) => state.auth.auth);

  const handleLogout = async () => {
    try {
      const { data: logoutResponse } = await axios.post('/api/auth/logout');
      if (!logoutResponse.success) {
        throw new Error(logoutResponse.message);
      }
      dispatch(logout());
      showToast('success', logoutResponse.message);
      router.push(WEBSITE_LOGIN);

    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={adminLogo.src} size={10} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mr-2" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">
                {auth?.name}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2 cursor-pointer">
            <IoAddCircleOutline size={18} />
            <span>New Product</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2 cursor-pointer">
            <MdOutlineShoppingBag size={18} />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
          <IoLogOutOutline color="red" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown