import burgerConstructorStyle from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {TIngredientWithIndexType, TSortableIngredientsPropType, useDispatch} from "../../utils/types";
import {useDrag, useDrop} from "react-dnd";

function SortableIngredients({ingredient, index, moveItem, id}: TSortableIngredientsPropType) {
    const {name, price, image} = ingredient;
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null)
    const handleDeleteItem = (index: number) => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: index
        })
    }
    const [{handlerId}, drop] = useDrop({
        accept: 'sortableIngredients',
        collect(monitor: any) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: TIngredientWithIndexType, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset!.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveItem(dragIndex - 1, hoverIndex - 1)
            item.index = hoverIndex
        },
    })
    const [{isDragging}, drag] = useDrag({
        type: 'sortableIngredients',
        item: () => {
            return {id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li
            className={burgerConstructorStyle.scrolled} ref={ref} style={{opacity: opacity}}
            data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass={burgerConstructorStyle.element}
                handleClose={() => handleDeleteItem(index)}
                // @ts-ignore
                moveItem={moveItem}
            />
        </li>
    )
}

export default SortableIngredients