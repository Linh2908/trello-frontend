export const handleSelect = (e) => {
    e.target.focus();
    e.target.select();
};

export const handleSaveAfterEnter = (e) => {
    if(e.keyCode === 13) {
      e.target.blur();
    };
};