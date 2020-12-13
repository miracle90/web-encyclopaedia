## SQL

```
-- 添加
INSERT student(name, idcard, age, city)
VALUES('李四', '88888', 120, '北京')

SELECT * FROM student;

-- INSERT注意事项

-- 更新
-- 注意事项
-- 1、一次可以更新多列
-- 2、可以指定更新条件，如果有多个条件可以用 and or not
-- mysql更新前、后值一样，不做更新
UPDATE student SET age=18,city='深圳' WHERE id = 2

-- 删除
-- 如果要删除的表示主表的，需要先删除子表
DELETE FROM student WHERE id = 2;

-- TRUNCATE 截断表，会重置标识符，不计入日志，没有备份
-- DELETE 会计入日志，可以恢复
-- DELETE FROM student

```