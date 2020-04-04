---
title: 'C#利用反射,遍历获得一个类的所有属性名'
date: 2016-03-15 16:15:26
tags:
    - C#
    - 反射
categories:
    - .NET
---
通过反射是可以完全获取一个对象的所有可取属性，并利用这些属性实现更多操作，比如对象的序列化之类。
代码如下
<!-- more -->
```C#
//传入类的实例
public static PropertyInfo[] getPropertyInfo<T>(T c)
{
PropertyInfo[] ps = null;
try
{
Type type = typeof(T);
T obj = Activator.CreateInstance(type);
ps = type.GetProperties((BindingFlags.Public | BindingFlags.Instance));
}
catch (System.Exception ex)
{         
 
}
return ps;
}

//传入类的类型
//使用
 PropertyInfo[] pis= actFunc.getPropertyInfo(typeof(property))

 //方法
 public static PropertyInfo[] getPropertyInfo(Type c)
 {
 PropertyInfo[] ps = null;
 try
 {
 //Type type = typeof(c);
 object obj = Activator.CreateInstance(c);
 ps = c.GetProperties((BindingFlags.Public | BindingFlags.Instance));
 }
 catch (System.Exception ex)
 {         

 }
 return ps;
 }
```

[参考文章](http://www.cnblogs.com/litian/articles/2002435.html)
>
```C#
private void button1_Click(object sender, EventArgs e)
       {
          Type t = typeof(System.Drawing.Color);
          string className = t.Name;
          MessageBox.Show(className);

          //获取所有方法
          System.Reflection.MethodInfo[] methods = t.GetMethods();
          this.textBox1.Text = "";
          foreach (System.Reflection.MethodInfo method in methods)
          {
              this.textBox1.Text += method.Name + System.Environment.NewLine;
          }

          //获取所有成员
          System.Reflection.MemberInfo[] members = t.GetMembers();

          //获取所有属性
          System.Reflection.PropertyInfo[] properties = t.GetProperties();

          foreach (System.Reflection.PropertyInfo property in properties)
          {
              this.lstColors.Items.Add(property.Name);
          }
      }

      private void lstColors_SelectedIndexChanged(object sender, EventArgs e)
      {
         this.pictureBox1.BackColor=  System.Drawing.Color.FromName(((ListBox)sender).Text);
      }
```


