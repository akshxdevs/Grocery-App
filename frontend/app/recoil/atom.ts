import { atom } from "recoil";

export const cartState = atom<
    { productId: string; productImg: string; productName: string; productPrice: number }[]
>({
    key: "cartState",
    default: [],
});

export const totalAmountState = atom<number>({
    key:"totalAmountState",
    default:0
})
