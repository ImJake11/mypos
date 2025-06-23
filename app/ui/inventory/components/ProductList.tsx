"use client"

import React, { useEffect, useRef, useState } from 'react'
import ProductTile from './ProductTile';
import { NewProductProps } from '@/app/lib/models/newProductModel';
import io, { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { resetInventoryState } from '@/app/lib/redux/inventorySlice';
import { RootState } from '@/app/lib/redux/store';
import { useSocketEvent } from '@/app/lib/utils/hooks/useSocket';

interface Prop {
    rawData: NewProductProps[],
}
const ProductList = ({ rawData }: Prop) => {

    const dispatch = useDispatch();

    const { isListView } = useSelector((state: RootState) => state.inventorySlice);

    const [products, setProducts] = useState<NewProductProps[]>(rawData);

    // update product state based on socket event
    useEffect(() => {

        // reset initial inventory state 
        dispatch(resetInventoryState())
    }, []);


    useSocketEvent("favorite_event", (data: any) => {
        const { id, isFavorite } = data;
        setProducts(prev => prev.map(pro => pro.id === id ? { ...pro, isFavorite } : pro));
    })


    return (
        <div className={`flex-1 overflow-auto gap-3.5 p-3.5 ${isListView ? "flex flex-col" : "grid grid-cols-4"}`}
        >
            {products ? products.map((d, i) => <ProductTile key={i} data={d} />) : null}
        </div>
    )
}

export default ProductList
