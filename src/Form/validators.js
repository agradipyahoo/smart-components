const trim = str => {
  return String(str).trim();
};
const identity = () => {};
export const validatorMap = {
  req: function(rule, value) {
    return value.toString().length === 0;
  },
  selReq: function(rule, value) {
    return value !== '-1';
  },
  digits: function(rule, value) {
    return /^\d{5}$/.test(value);
  },
  alphanumeric: function(rule, value) {
    let ck_alphaNumeric = /^\w+$/;
    return ck_alphaNumeric.test(value);
  },
  number: function(rule, value) {
    if (value === undefined) {
      return true;
    }
    let numberVal = +value;
    return numberVal === numberVal;
  },
  email: function(rule, value) {
    let ck_email = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
    return ck_email.test(value.trim());
  },
  minlen: function(rule, value) {
    let min = rule.length;
    return trim(value).length >= min;
  },
  maxlen: function(rule, value) {
    let max = rule.length;
    return trim(value).length <= max;
  },
  lt: function(rule, value) {
    let target = parseFloat(rule.value);
    let curvalue = parseFloat(value);
    return curvalue < target;
  },
  gt: function(rule, value) {
    let target = parseFloat(rule.value);
    let curvalue = parseFloat(value);
    return curvalue > target;
  },
  eq: function(rule, value) {
    return rule.value === value;
  },
  neq: function(rule, value) {
    return rule.value !== value;
  },
  url: function(rule, value) {
    if (value === '') {
      return true;
    }
    let ck_url = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
    return ck_url.test(trim(value));
  },
  emaillist: function(rule, value) {
    let emails = value.split(',');
    let ck_email = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    for (let i = 0; i < emails.length; i++) {
      if (trim(emails[i]) !== '' && !ck_email.test(trim(emails[i]))) {
        return false;
      }
    }
    return true;
  },
  function: function(rule, value) {
    let func = rule.func;
    return func.call(this, value, rule);
  },
};

export const getRuleValue = function(item) {
  return {
    type: item.expr,
    value: item.value,
    element: item.element,
    func: item.expr === 'function' ? item.func : validatorMap[item.expr],
    message: item.message || item.expr,
  };
};

export const getPropRule = item => {
  return {
    type: item.expr,
    element: item.element,
    prop: item.prop,
    value: item.value,
    valueFunc: item.valueFunc || identity,
    func: item.func,
  };
};
