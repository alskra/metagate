let bemS = (b, e = '', m = '') => '.' + b + (e ? '__' + e : '') + (m ? '--' + m : ''); // return BEM class selector

let bemC = (b, e = '', m = '') => b + (e ? '__' + e : '') + (m ? '--' + m : ''); // return BEM class