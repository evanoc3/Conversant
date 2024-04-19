BEGIN;

INSERT INTO "lesson_parts" ("id", "lesson", "content", "pause", "type", "proceedTo", "onYes", "onNo", "onA", "onB", "onC", "onD", "onUndecided")
VALUES
	(1,0,'This is an example lesson. It is used to demonstrate the features available for lessons in Conversant.',0,'proceed',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,0,'In Conversant, lesson parts are stored in the database as markdown text. They are then rendered on-the-fly by the client. Conversant supports all features of common mark, and Github flavoured markdown.',0,'proceed',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,0,'Example: _Italic text_.',0,'proceed',4,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,0,'Example: **Bold text**.',0,'proceed',5,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,0,'Example: [Link to example.com](http://example.com).',0,'proceed',6,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(6,0,'Example: ~strikethrough text~',0,'proceed',7,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(7,0,'Example: block quotes.\n\n> Hello, World!',0,'proceed',8,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(8,0,'Example: ordered list:\n1. ordered item 1,\n2. ordered item 2,\n3. ordered item 3,\n\nExample: unordered list:\n* list item 1\n* list item 2\n* list item 3',0,'proceed',9,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(9,0,'Example: `inline code`.\n\nExample: code block\n\n```typescript\nconst i = \"am a code block\";\nvar a = 1 + 3;\n```\n',0,'proceed',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(10,0,'Example: Headers 1-6\n\n# Header 1\n\n## Header 2\n\n### Header 3\n\n#### Header 4\n\n##### Header 5\n\n###### Header 6\n\n',0,'proceed',11,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(11,0,'Example: inline math, $x^y = z_q$.\n\nExample: math block\n$$$\ne^{i \\pi} - 1 = 0\n$$$',0,'proceed',12,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(12,0,'Example: Image\n\n![Image](https://getconversant.io/icons/logo-128.png)',0,'proceed',13,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(13,0,'Example: Check list\n- [x] checked\n- [ ] unchecked\n- [x] checked again\n',0,'proceed',14,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(14,0,'Example: Table\n\n| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n| 1 | 2 | 3 | 4 |',0,'proceed',15,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(15,0,'And that''s about it for formatting. \n\nConversant can also embed a logged-in user''s details in messages, to feel more authentic. For instance, it can template in a user''s name to seem like its talking directly to you, _e.g. "Hi [[NAME]]"_ (these templates will be removed for unauthenticated users).',0,'proceed',16,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(16,0,'Conversant can also pose yes/no questions to the user. For example, if you reply some variation of **yes** to this message you will proceed, but if you answer **no**, you will receive a different reply which ultimately brings you back here. Isn''t that cool?',0,'yesNo',NULL,19,18,NULL,NULL,NULL,NULL,17),
	(17,0,'I''m sorry, I didn''t understand that. Could you try rephrasing it?',0,'yesNo',NULL,19,18,NULL,NULL,NULL,NULL,17),
	(18,0,'Hmm, that''s a shame. Why don''t you try again...',0,'proceed',16,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(19,0,'Great! So you''ve seen first-hand how you''re able to answer yes/no questions, but what about multiple choice?\n',0,'proceed',20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(20,0,'* **A**: I love multiple choice!\n* **B**: Meh\n* **C**: Ugh\n* **D**: I hate MCQs\n\n_(hint: the answer is A)_',0,'multipleChoice',NULL,NULL,NULL,21,22,23,24,25),
	(21,0,'You selected \"A\", that''s the right answer. Good job!',0,'proceed',26,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(22,0,'You selected \"B\". You were almost right, try again.',0,'proceed',20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(23,0,'You selected \"C\". You should try and have a better attitude about this... try again',0,'proceed',20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(24,0,'You selected \"D\"... D for dumbass! Back to the start for you!',0,'proceed',20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(25,0,'I''m sorry, I didn''t quite catch that... try again.',0,'proceed',20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(26,0,'Congratulations on finishing this lesson [[NAME]]. We hope its the first of many more to come!',0,'endOfLesson',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(27,1,'Hi [[NAME]]',0,'proceed',28,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(28,1,'This lesson is to give you some background about the Java programming language and to answer questions such as why you would use it, and its advantages over other programming languages.',1000,'proceed',29,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(29,1,'If you want though, you can move straight on to the next lesson to begin learning about how to use Java.\n\nWould you like to like to continue this lesson and learn more about the background behind Java?',0,'yesNo',NULL,32,30,NULL,NULL,NULL,NULL,NULL),
	(30,1,'Alright, see you in the next lesson!',0,'endOfLesson',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(32,1,'Great! So as you might have already seen Java is an ''object-oriented'' programming language. Well what does that mean?',1000,'proceed',33,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(33,1,'That means that the fundamental building blocks of programs in Java are called **objects**. Objects are a structured way of organising our code into _chunks_ which makes us as programmers better able to reason about what our code should do.',1000,'proceed',34,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(34,1,'In Java though, we don''t write the objects directly. Instead we write **classes**, and the objects are created as instances of a class. You can imagine classes as blueprints and objects as the finished products. Objects of the same class are similar right after coming off the production line, but they are independent, and if something happens to one of them, it will not affect the others.',1000,'proceed',99,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(99,1,'Thanks for listening.',0,'endOfLesson',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO "lessons" ("id", "topic", "title", "description", "firstPart", "nextLesson")
VALUES
	(0,'example','Example Lesson','See all of the features that lessons in Conversant can offer.',1,NULL),
	(1,'java','What is Java?','An overview of why you might want to learn Java, and some observations on its architecture.',27,NULL);

INSERT INTO "topics" ("id", "label", "description", "firstLesson")
VALUES
	('example','Example Topic','This is an example topic created to store a sample lesson for the purposes of demonstrating the Conversant platform.',0),
	('java','Java Programming','Java is an applications programming language. It is platform independent, object-oriented multi-threaded, and secure, and these factors have come together to make it one of the most widely used programming languages ever.\n\nIn this course, you will learn programming with the Java programming language from the ground up.',1);

COMMIT;
