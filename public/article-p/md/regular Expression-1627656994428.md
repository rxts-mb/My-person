[TOC]

### 正则表达式

```js
//regular Expression
//其实就是一套规则，一般用来处理字符串的查询和替换工作。
写法：
	1.字面量
    	/正则规则/ 
    2.使用构造函数
    	new RegExp(字符串的规则)  // 
```

#### test

```
reg.test(str)	//匹配成功返回true，反正false  //str  源字符串
```

#### match

```js
// str.match(需要匹配的规则/子字符串)
*       这是字符串的方法 
*       会返回一个数组，包含着匹配内容，如果不成功返回null；
	/*
		在使用正则作为规则时：
			正则没有标识符g：返回第一次匹配成功的结果，同时index属性返回下标，input返回目标字符串
			正则有标识符g：返回一个数组，数组里都是匹配成功的结果（字符串），没有index和input
    */
```

#### replace

**用于对字符串进行替换**
该方法是字符串的方法，接收两个参数第一个匹配的规则（可以是字符串也可以是正则表达式），第二个可以是字符串，也可以是函数，函数必须有返回值作为替换内容。

```js
//例1：
var str = "XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？"
var reg = /XX/g;
console.log(str.replace(reg,"风屿")) //风屿我爱你，风屿你咋帅呢？风屿你有对象么？如果有，介意再多一个么？
console.log(str.replace(reg,function(){
  return "fengyu"
})) //fengyu我爱你，fengyu你咋帅呢？fengyu你有对象么？如果有，介意再多一个么？
```

> 大佬讲重点，快拿小本本记下来

##### 第二个参数是函数时：

1.如果正则没有子集：

```js
//此时函数有3个形参，第一个：匹配的内容；第二个：下标；第三个：源字符串
//例如：
var str = "XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？"
var reg = /XX/g;
str.replace(reg,function (a,b,c) {
	console.log(a,b,c)
})
/*
XX 0 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
XX 6 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
XX 13 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
*/
```

2.如果正则有子集：

```js
/*此时函数有n（子集个数+3）个形参，
第一个：匹配的内容；
第二个：第一个子集（如果有多个子集就往后顺延）；//比如有两个子集，则第三个是第二个子集，第四个是下标...
第三个：下标；
第四个：源字符串
*/
var str = "XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？"
var reg = /(XX)+/g;
str.replace(reg,function (a,b,c,d) {
  	console.log(a,b,c,d)
})
/*
XX XX 0 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
XX XX 6 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
XX XX 13 XX我爱你，XX你咋帅呢？XX你有对象么？如果有，介意再多一个么？
*/
```

##### replace的经典用法

```js
#这是replace的一个经典用法，[好好看好好学]
//交换字符串里东西的位置
var str = "fengyu 风屿";   //交换fengyu和风屿的位置
var reg = /(\w)+\s(风屿)/g;	//此时正则有两个子集
console.log(str.replace(reg,"$2 $1"))
/*
	此时的输出结果为：风屿 fengyu
	所见即所得：第二个参数是字符串时，如果正则有子集，字符串里$1代表第一个子集，$2代表第二个......
*/
```

#### exec

```js
#此方法用处不是很大，并且坑很多
//此方法跟迭代器有点类似，执行结果是按序输出
var str = "abc";  
var reg = /\w/g;	
console.log(reg.exec(str))	// ["a", index: 0, input: "abc"]
console.log(reg.exec(str))	// ["b", index: 1, input: "abc"]
console.log(reg.exec(str))	// ["c", index: 2, input: "abc"]
console.log(reg.exec(str))	// null
//然后再调用一次
console.log(reg.exec(str))	// ["a", index: 0, input: "abc"]
```




#### 元字符

```js
//转义符  ：  \   对后面的字符进行转义

//特殊字符
	正斜杠：/  反斜杠: \(转义)
	换行符: Linux(\n) MacOS(类Unix)(\r)  windows (\n\r还有可能是\n)
	
   	\d	数字的是意思  0~9
	\D	非数字
    \s	空格
    \S	非空格
    \w	字符（数字、字母、_）
    \W	非字符（除了\w之外的所有东西 ）
    .	匹配任意字符，但是不包括（\n  \r）
    
    \b	独立部分（单词边界 单词起始 结束 连词符(除了\w之外的都属于连词符)  ）
	\B  非独立部分
```

#### {} 量词

```js
// 写法：{}  量词的每种次数之间都是或者关系
// 量词管辖前一个字符，除外（）
{0,8}   最少出现0次，最多只能出现8次
{2,5}   最少出现2次，最多出现5次

//特殊的写法：
{0,1}    最少出现0次，最多出现1次。  可有可无
      	简写为:?
{0,}     最少出现0次，最多.......   0到正无穷
    	简写为:*
{1,}     最少出现1次，最.....       1到正无穷
        简写为:+
```

#### 标识符

```js
 //标识符  /规则/gim
    *       g   global  		全局匹配
    *       i   ignore case 	不区分大小写
    *       m   multiline   	换行匹配 （没有卵用）
```

#### 起始符和结束符

```js
起始符(行首)   ^   
  	//一行的开头
终止符(行尾)   $   
	//一行的结束
```

#### 贪婪和非贪婪

```js
//贪婪和非贪婪：要在有量词时才会存在。
#贪婪匹配
    *       直接写量词就是贪婪
    *       会优先从最高次开始匹配
#非贪婪匹配
    *       非贪婪是在量词后面加   ?
    *       优先从最少次数开始匹配
//例如：
    
var str = "AAAABBBBBCCCCC"
var reg = /a{1,3}?/ig;	//非贪婪	["A", "A", "A", "A"]
var reg = /a{1,3}/ig;	//贪婪	 ["AAA", "A"]
console.log(str.match(reg))
```

#### () 子集

```js
#   ()    子集
	//子集：被括号括起来的属于一个整体

//例如：
var str = "ABabbabbb"  
var reg = /(ab)+/ig; // ["ABab", "ab"]    有子集
var reg = /ab+/ig; // ["AB", "abb", "abbb"] 没有子集
console.log(str.match(reg))
```

#### [] 范围词

```js
#   []  范围词
    // 里面的所有字符都是 或者 关系

var str = "abcd64efd_gsah15dgsa_dgsha89gdjgABCDEFG_"
    
var reg = /[AZa-z0-9]+/g;   //[a-z] 等价于 a|b|c|d|e......|z
    
console.log(str.match(reg))
```

### 非







#### | 或者

```js
#    |   或者

var str = "abdsadabtyebwaqi"
var reg = /a|b/g;	//["a", "b", "a", "a", "b", "b", "a"]
var reg = /ab/g;	//["ab", "ab"]
console.log(str.match(reg))
```

#### 匹配中文

```js
#所有的中文都在这个范围	\u4e00-\u9fa5
```

#### 断言

> (?:模式)  不捕获匹配
>
> 子级 默认为捕获匹配

##### 先行断言、正向肯定预测（?=模式）

```js
let str1 = 'fengyu123'
let str2 = 'fengyu456'

let reg = /fengyu(?=123)/
reg.test(str1) // true
reg.test(str2) // false
```

##### 正向否定预测（?!模式）

```js
let str1 = 'fengyu123'
let str2 = 'fengyu456'

let reg = /fengyu(?!123)/
reg.test(str1) // false
reg.test(str2) // true
```

##### 反向肯定预测（?<=模式）

```js
let str1 = '123fengyu'
let str2 = '456fengyu'

let reg = /(?<=123)fengyu/
reg.test(str1) // true
reg.test(str2) // false
```

##### 反向否定预测（?<!模式）

```js
let str1 = '123fengyu'
let str2 = '456fengyu'

let reg = /(?<!123)fengyu/
reg.test(str1) // false
reg.test(str2) // true
```

