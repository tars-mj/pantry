import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MainInput from 'components/atoms/MainInput';
import MainButton from 'components/atoms/MainButton';
import { DataContext } from 'context/DataContext';

const AddToListForm = ({ productToEdit, onCloseModal, isEdit }) => {
  const { handleSubmit, register, errors } = useForm();
  const { shoppingList, addToShoppingList, updateQuantityOnList } = useContext(DataContext);
  const [isExist, setExist] = useState(false);

  useEffect(() => {
    if (shoppingList.find((x) => x.id === productToEdit.id)) {
      setExist(true);
    }
  }, []);

  const onSubmit = (values) => {
    if (!isEdit) {
      addToShoppingList({
        id: productToEdit.id,
        productName: productToEdit.productName,
        quantity: values.quantity,
        unit: productToEdit.unit,
      });
    } else {
      updateQuantityOnList({ id: productToEdit.id, quantity: values.quantity });
    }

    onCloseModal();
  };

  const checkValue = (value) => {
    if (isNaN(value)) {
      return 'Required number!';
    }
    if (value <= 0) {
      return 'Fill quantity to buy';
    }
  };

  const form = (
    <form onSubmit={handleSubmit(onSubmit)}>
      Enter quantity
      <MainInput
        title="Actual quantity"
        name="quantity"
        defaultValue={isEdit ? productToEdit.quantity : 0}
        ref={register({
          required: 'Required',
          validate: (value) => checkValue(value),
        })}
        isError={errors.quantity}
      />
      {errors.quantity && errors.quantity.message}
      <MainButton type="submit">{productToEdit ? 'Save' : 'Add'}</MainButton>
    </form>
  );
  return <>{isEdit ? form : isExist ? 'This product already exists on a shopping list!' : form}</>;
};

export default AddToListForm;
