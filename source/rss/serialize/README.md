# serialize-xml 
A simple module for serializing objects to XML. 
Now part of [markblog](htttps://github.com/olaven/markblog), however it may 
become a standalone module after some usage/testing. 

## Usage 
There are two types that are relevant: 
1. `Tag` - representing a tag, like `<this></this>`
2. `Attribute` - `<tag represents="key value pairs like this"></tag>`

## Example 
```ts
const xml = serialize({
    name: "my_tag_name", 
    children: [
        {
            name: "sub_tag", 
            children: "inner_content_of_tag", 
            attributes: []
        }
    ],
    attributes: []
});

//prints: `<my_tag_name><sub_tag>inner_content_of_tag</sub_tag></my_tag_name>`
console.log("serialized: ", xml); 
```
