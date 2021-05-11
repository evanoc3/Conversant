const natural = require("natural");
const classifier = new natural.LogisticRegressionClassifier();


classifier.addDocument("a", "A");
classifier.addDocument("1", "A");
classifier.addDocument("first", "A");
classifier.addDocument("1st", "A");
classifier.addDocument("it is a", "A");
classifier.addDocument("it is 1", "A");
classifier.addDocument("the first one", "A");
classifier.addDocument("the first option", "A");
classifier.addDocument("option a", "A");
classifier.addDocument("the first choice", "A");
classifier.addDocument("choice a", "A");
classifier.addDocument("top", "A");
classifier.addDocument("the top one", "A");
classifier.addDocument("the top choice", "A");
classifier.addDocument("the top option", "A");

classifier.addDocument("b", "B");
classifier.addDocument("2", "B");
classifier.addDocument("2nd", "B");
classifier.addDocument("be", "B");
classifier.addDocument("bee", "B");
classifier.addDocument("second", "B");
classifier.addDocument("it is b", "B");
classifier.addDocument("it is 2", "B");
classifier.addDocument("the second one", "B");
classifier.addDocument("the second option", "B");
classifier.addDocument("option b", "B");
classifier.addDocument("the second one", "B");
classifier.addDocument("the second choice", "B");
classifier.addDocument("choice b", "B");

classifier.addDocument("c", "C");
classifier.addDocument("ce", "C");
classifier.addDocument("cee", "C");
classifier.addDocument("see", "C");
classifier.addDocument("sea", "C");
classifier.addDocument("3", "C");
classifier.addDocument("3rd", "C");
classifier.addDocument("third", "C");
classifier.addDocument("it is c", "C");
classifier.addDocument("it is 3", "C");
classifier.addDocument("the third one", "C");
classifier.addDocument("the third option", "C");
classifier.addDocument("option c", "C");
classifier.addDocument("the third choice", "C");
classifier.addDocument("choice c", "C");

classifier.addDocument("d", "D");
classifier.addDocument("de", "D");
classifier.addDocument("dee", "D");
classifier.addDocument("dee", "D");
classifier.addDocument("dea", "D");
classifier.addDocument("4", "D");
classifier.addDocument("4th", "D");
classifier.addDocument("fourth", "D");
classifier.addDocument("it is d", "D");
classifier.addDocument("it is 4", "D");
classifier.addDocument("the fourth one", "D");
classifier.addDocument("the fourth option", "D");
classifier.addDocument("option d", "D");
classifier.addDocument("the fourth choice", "D");
classifier.addDocument("choice d", "D");
classifier.addDocument("bottom", "D");
classifier.addDocument("the bottom one", "D");
classifier.addDocument("the bottom choice", "D");
classifier.addDocument("the bottom option", "D");


classifier.train();
console.log(JSON.stringify(classifier));
