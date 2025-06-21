"use client"

import React, { useEffect, useRef, useState } from 'react'
import ProductTile from './ProductTile';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import io, { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { resetInventoryState } from '@/app/lib/redux/inventorySlice';

interface Prop {
    rawData: NewProductProps[],
}
const ProductList = ({ rawData }: Prop) => {

    const dispatch = useDispatch();

    const [products, setProducts] = useState<NewProductProps[]>(rawData);


    let socket: typeof Socket;

    // update product state based on socket event
    useEffect(() => {

        // reset initial products state 
        dispatch(resetInventoryState())
        socket = io(String(process.env.NEXT_PUBLIC_SOCKET_URL));

        socket.on("connection", () => {
            console.log("Connected to web socket");
        });


        socket.on("updated_favorite", (newData: NewProductProps) => {

            setProducts(prevProducts => {

                // find the specific product to update
                const updatedProducts = prevProducts.map(product => {
                    if (product.id === newData.id) {

                        return { ...product, isFavorite: newData.isFavorite }
                    }
                    //return the product that is not updated
                    return product;
                });


                // return the updated products list
                return updatedProducts;
            });
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from web socket");
        });


        return () => {
            socket.off("updated_favorite");
            socket.disconnect();
        }


    }, []);




    return (
        <div className='flex-1 grid grid-cols-4 overflow-auto gap-3.5 p-3.5'>
            {products ? products.map((d, i) => <ProductTile key={i} data={d} />) : null}
        </div>
    )
}

export default ProductList
