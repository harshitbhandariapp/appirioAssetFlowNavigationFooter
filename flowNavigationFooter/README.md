# Pls READ ME
This component does something simple: it replaces the normal flow footer buttons with buttons that you get to name,align,show or hide it and give the colors you want . (Right now, that's it, although we have ambitions...)

Set the Next Label and Previous Label to text of your choice. This component doesn't know when it's on the first page or the last page, so you need to tell it: if you put it on the first page, set the "Show Next Button" to the Global True constant. Likewise if it's on the finish page.

CAUTION:if you put any button button on the flow screen and the screen does not support the action it will be shown as disabled.For example :like if you show previous button on first screen it will shown disabled.

Remember to click off the standard Footer using the checkbox in your flow screen configuration.

Want to change the appearance? add values at builder properties.For example :for "Next Button Background Color" you can just type in color you want like :"red" or type the HEX code for it : "#FF0000" or the RGB Color Code :"rgb(255, 0, 0)".It supports all three of them.

To use the pause functionality of the flow DON'T FORGET to change the Process Automation Settings in the setup menu "Let users pause flows" to true.

For alignment of the buttons NEXT button allows "Right" or "Center" alingment values and PREVIOUS supports "Left" or "Center".
