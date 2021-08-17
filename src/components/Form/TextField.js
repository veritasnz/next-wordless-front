export default function TextField(props) {
    const {
        id,
        labelText,
        errorText,
        value,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        required,
        ...leftoverProps
    } = props;

    return (
        <div
            className={`c-form__control ${hasError && "c-form__control--invalid"}`}
        >
            <label className="c-form__label" htmlFor={id}>
                {labelText}
            </label>
            <input
                className="c-form__field"
                type="text"
                id={id}
                value={value}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                aria-invalid={hasError}
                aria-required={required}
                required={required}
                {...leftoverProps}
            />
            {hasError && <p className="c-form__error">{errorText}</p>}
        </div>
    );
}
