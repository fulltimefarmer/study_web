const nf = new Intl.NumberFormat('en-US');

function numTransition(num) {
    if (num === '-') return '-'
    let checkNum = isNaN(num)
    try {
      if ((num + '').indexOf('%') != -1) {
        return num
      } else if (num == 0) {
        return 0
      } else if (checkNum) {
        return 0
      }
      if (!(num + '').includes('.')) {
        let len = (num + '').length
        // console.log(len)
        num = num * 1;
        if (len <= 4) {
          num = num.toFixed(0)
        } else if (len > 4 && len <= 8) {
          num = (num / 10000).toFixed(1) + '万'
        } else if (len == 8) {
          num = (num / 10000).toFixed(1) + '万'
        } else if (len > 8) {
          num = (num / 100000000).toFixed(1) + '亿'
        }
      } else {
        num = num + ''
        let newNum = num.split('.')[0]
        let intNumlength = newNum.length
        let intNum = newNum * 1;
        if (intNumlength <= 4) {
          let times = Math.pow(10, 1)
          var des = num * times + 0.5
          num = parseInt(des, 10) / times
          num = num * 1;
          // num = num.toFixed(0)
        } else if (intNumlength > 4 && intNumlength <= 8) {
          num = (intNum / 10000).toFixed(1) + '万'
        } else if (intNumlength == 8) {
          num = (intNum / 10000).toFixed(1) + '万'
        } else if (intNumlength > 8) {
          num = (intNum / 100000000).toFixed(1) + '亿'
        }
      }
      return num
    } catch (error) {
      return 0
    }
  }
  
  function convert(num) {
    let result;
    let numStr = num + '';
    if (numStr === '' || numStr === '-') {
      return numStr;
    }
    let suffix = '';
    if (numStr.indexOf('%') !== -1) {
      return numStr;
    }
    if (isNaN(numStr)) {
      return 0;
    }
    try {
      let doubleNum = numStr * 1;
      if (doubleNum >= 10000 && doubleNum <= 100000000) {
        suffix = '万';
        result = nf.format((doubleNum / 10000).toFixed(1));
      } else if (doubleNum > 100000000) {
        suffix = '亿';
        result = nf.format((doubleNum / 100000000).toFixed(1));
      } else {
        result = nf.format(doubleNum.toFixed(0));
      }
      if (suffix !== '') {
        result = result + suffix;
      }
      return result;
    } catch (error) {
      return 0;
    }
  }
  
  // 测试代码
  var test = [
    '',
    '-',
    '1234',
    '12345',
    '12345678',
    '123456789012',
    '1234567890123456',
    '0.123456',
    '1.234',
    '12.345',
    '12345.6789',
    '0%',
    '1.234567%',
    '123456.123456%'
  ];
  
  // 输出结果
  for (var idx in test) {
      let num = test[idx];
      console.log('origin: ' + num);
      console.log('numTransition: ' + numTransition(num))
      console.log('convert: ' + convert(num));
      console.log('\t\n');
  }
  