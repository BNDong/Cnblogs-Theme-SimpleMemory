# Eve

Tiny event helping JavaScript library.

## eve(name, scope, varargs)
Fires event with given `name`, given scope and other parameters.

### Parameters
- _name_  **string**
    name of the _event_, dot (`.`) or slash (`/`) separated
- _scope_  **object**
    context for the event handlers
- _varargs_  **...**
    the rest of arguments will be sent to event handlers

**Returns:**  **object** array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.

## eve.listeners(name)
Internal method which gives you array of all event handlers that will be triggered by the given `name`.

### Parameters
- _name_  **string**
    name of the event, dot (`.`) or slash (`/`) separated

**Returns:**  **array** array of event handlers

## eve.separator(separator)
If for some reasons you don’t like default separators (`.` or `/`) you can specify yours
here. Be aware that if you pass a string longer than one character it will be treated as
a list of characters.

### Parameters
- _separator_  **string**
    new separator. Empty string resets to default: `.` or `/`.


## eve.on(name, f, name, f)
Binds given event handler with a given name. You can use wildcards “`*`” for the names:

```js
eve.on("*.under.*", f);
eve("mouse.under.floor"); // triggers f
```
Use <a href="#eve" class="dr-link">eve</a> to trigger the listener.

### Parameters
- _name_  **string**
    name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
- _f_  **function**
    event handler function
- _name_  **array**
    if you don’t want to use separators, you can use array of strings
- _f_  **function**
    event handler function

**Returns:**  **function** returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment.

### Example:
```js
eve.on("mouse", eatIt)(2);
eve.on("mouse", scream);
eve.on("mouse", catchIt)(1);
```
This will ensure that `catchIt` function will be called before `eatIt`.

If you want to put your handler before non-indexed handlers, specify a negative value.
Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.


## eve.f(event, varargs)
Returns function that will fire given event with optional arguments.
Arguments that will be passed to the result function will be also
concated to the list of final arguments.

```js
el.onclick = eve.f("click", 1, 2);
eve.on("click", function (a, b, c) {
    console.log(a, b, c); // 1, 2, [event object]
});
```
### Parameters
- _event_  **string**
    event name
- _varargs_  **…**
    and any other arguments

**Returns:**  **function** possible event handler function

## eve.stop()
Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.


## eve.nt([subname])
Could be used inside event handler to figure out actual name of the event.

### Parameters
- _subname_  **string**
    subname of the event

**Returns:**  **string** name of the event, if `subname` is not specified
or

**Returns:**  **boolean** `true`, if current event’s name contains `subname`

## eve.nts()
Could be used inside event handler to figure out actual name of the event.

**Returns:**  **array** names of the event

## eve.off(name, f)
Removes given function from the list of event listeners assigned to given name.
If no arguments specified all the events will be cleared.

### Parameters
- _name_  **string**
    name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
- _f_  **function**
    event handler function


## eve.unbind()
See <a href="#eve.off" class="dr-link">eve.off</a>


## eve.once(name, f)
Binds given event handler with a given name to only run once then unbind itself.

```js
eve.once("login", f);
eve("login"); // triggers f
eve("login"); // no listeners
```
Use <a href="#eve" class="dr-link">eve</a> to trigger the listener.

### Parameters
- _name_  **string**
    name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
- _f_  **function**
    event handler function

**Returns:**  **function** same return function as <a href="#eve.on" class="dr-link">eve.on</a>

## eve.version()
Current version of the library.


