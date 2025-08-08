import { ImageSourcePropType, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Product {
  id: number;
  image: ImageSourcePropType;
  title: string;
  category: string;
  distance: number;
  rating: number;
  price: number;
  description?: string;
}

export type CartItem = Product & { quantity: number };

export interface CategoryItem {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export interface CategoryProps {
  onCategoryPress?: (category: string) => void;
  onSeeAllPress?: () => void;
  selectedCategory?: string;
}

export interface AuthUser {
  email?: string;
  userName?: string; 
  username?: string; 
  password?: string;
  isRegistered?: boolean | "true" | "false";
}

export interface ProductState {
  productList: Product[];
  productCartList: CartItem[];
}

export interface AuthState {
  user: AuthUser | null;
  loading?: boolean;
}

export interface RootState {
  product: ProductState;
  auth: AuthState;
}

export type IconName = keyof typeof Ionicons.glyphMap;

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: string;
  size?: string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconSize?: number;
  rippleColor?: string;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  secureToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

export interface HeaderProps {
  title: string;
}

export interface ChatCardItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  read: boolean;
}

export interface ChatCardProps {
  item: ChatCardItem;
  onPress?: () => void;
}

export type IChat = ChatCardItem;

export interface IMessage {
  id: string;
  message: string;
  timestamp: number;
  isUser: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

export type LatLng = { latitude: number; longitude: number };

export interface UserProfile {
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
}


