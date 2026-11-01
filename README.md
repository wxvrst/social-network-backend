## Заметки:

zod умеет:
```
MySchema.parse()- ERROR при ошибки
MySchema.safeParse()- warn при ошибке, и деление на {success: и data:} при правильном
z.object({}).sctrict()- если добавить к объекту поле, которое не указано, то zod его проигнорирует, но если включить strict(), то выдаст ошибку
z.number().gt().lt()- greater then и less then
z.string().startsWith().length()
z.number().or(z.string())
isOpened = z.literal(['Open','Closed'])
z.email(), z.url(), z.uuid(), z.date(), z.record(z.string(), z.number()), z.any()
z.undefined(), z.null(), z.nullable(), z.nullish(), z.unknown(), z.never()
z.refine()- для своей логики валидации
```