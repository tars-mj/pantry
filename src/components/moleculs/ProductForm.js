import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import MainInput from 'components/atoms/MainInput';
import MainButton from 'components/atoms/MainButton';
import { DataContext } from 'context/DataContext';

const ProductForm = ({ productToEdit, onCloseModal }) => {
  const { handleSubmit, register, errors, getValues } = useForm();
  const { addProductPantry, updateProductPantry } = useContext(DataContext);

  const onSubmit = (values) => {
    if (productToEdit) {
      const editedProduct = { ...productToEdit, ...values };
      updateProductPantry(editedProduct);
      onCloseModal();
    } else {
      const id = Date.now();

      addProductPantry({
        ...values,
        id,
      });
      onCloseModal();
    }
  };

  const validateMin = (value) => {
    const { max } = getValues();
    if (isNaN(value)) {
      return 'Required number!';
    }
    if (Number(value) > max) {
      return 'Min value must be smaller than max value!';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input
        title="Nazwa"
        name="Nazwa"
        ref={register({
          validate: (value) => value !== 'admin' || 'Nice try!',
        })}
      /> */}
      <MainInput
        title="Name"
        name="productName"
        defaultValue={productToEdit && productToEdit.productName}
        ref={register({
          required: 'Required',
        })}
        isError={errors.name}
      />
      {errors.name && errors.name.message}
      <MainInput
        title="Unit"
        name="unit"
        defaultValue={productToEdit && productToEdit.unit}
        ref={register({
          required: 'Required',
          validate: (value) => isNaN(value) || 'Required string!',
        })}
        isError={errors.unit}
      />
      {errors.unit && errors.unit.message}
      <MainInput
        title="Minimal value in pantry"
        name="min"
        defaultValue={productToEdit && productToEdit.min}
        ref={register({
          required: 'Required',
          validate: (value) => validateMin(value),
        })}
        isError={errors.min}
      />
      {errors.min && errors.min.message}
      <MainInput
        title="Maximal value in pantry"
        name="max"
        defaultValue={productToEdit && productToEdit.max}
        ref={register({
          required: 'Required',
          validate: (value) => !isNaN(value) || 'Required number!',
        })}
        isError={errors.max}
      />
      {errors.max && errors.max.message}
      <MainInput
        title="Actual quantity"
        name="quantity"
        defaultValue={productToEdit && productToEdit.quantity}
        ref={register({
          required: 'Required',
          validate: (value) => !isNaN(value) || 'Required number!',
        })}
        isError={errors.quantity}
      />
      {errors.quantity && errors.quantity.message}
      <MainButton type="submit">{productToEdit ? 'Save' : 'Add'}</MainButton>
    </form>
  );
};

export default ProductForm;
