import burgerConstructorStyle from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import ingredientType from "../../utils/ingredient-type";
import PropTypes from "prop-types";

function SortableIngredients({ingredient, index, moveItem, id}) {
    const {name, price, image} = ingredient;
    const dispatch = useDispatch();
    const ref = useRef(null)
    const handleDeleteItem = (index) => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: index
        })
    }
    const [{handlerId}, drop] = useDrop({
        accept: 'sortableIngredients',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
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

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

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
        collect: (monitor) => ({
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
                moveItem={moveItem}
            />
        </li>
    )
}

SortableIngredients.propTypes = {
    ingredient: ingredientType.isRequired,
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default SortableIngredients