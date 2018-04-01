const getAllUrl = "todo/";
const saveUrl = "todo/save";
const deleteUrl = "todo/delete/";
const markUrl = "todo/mark";

const addIconActive = "resources/images/add-active.svg";
const addIconNotActive = "resources/images/add-notactive.svg";
const markIconActive = "resources/images/mark-active.svg";
const markIconNotActive = "resources/images/mark_notactive.svg";
const editIconActive = "resources/images/edit-active.svg";
const editIconNotActive = "resources/images/edit-notactive.svg";
const deleteIconActive = "resources/images/delete-active.svg";
const deleteIconNotActive = "resources/images/delete-notactive.svg";

$(function(){
    updateTable();
    onAdd();
});

function updateTable() {
    $.getJSON(getAllUrl, {}, function(result){
        console.log(result);
        let tbody = $("tbody");
        let counter = 1;
        tbody.empty();
        if(result.length === 0){
            tbody.append("<tr><td colspan=\"7\"><b>There are no tasks available</b></td></tr>");
            return;
        }

        let activeTasks = result.filter(element => element.finished !== true);
        if(activeTasks.length > 0) {
            tbody.append("<tr><td></td><td colspan=\"7\"><b>Active tasks</b></td></tr>");
            activeTasks.forEach(function (todo) {
                createRow(tbody, todo, counter);
                counter++;
            });
        }

        let finishedTasks = result.filter(element => element.finished === true);
        if(finishedTasks.length > 0) {
            tbody.append("<tr><td></td><td colspan=\"7\"><b>Finished tasks</b></td></tr>");
            finishedTasks.forEach(function (todo) {
                createRow(tbody, todo, counter);
                counter++;
            });
        }

        onEditIcon();
        onDeleteIcon();
        onMark();
    });
}

function createRow(tbody, todo, counter) {
        let id = todo.id;
        let finished = todo.finished;
        let textTask = "<input class=\"hidden-input\" type=\"text\" value=\"" + todo.task + "\" readonly/>";
        let markTask = todo.finished === true ? "<img class=\"mark-icon\" src=\"" + markIconActive + "\" alt=\"Mark\">"
            : "<img class=\"mark-icon\" src=\"" + markIconNotActive + "\" alt=\"Mark\">";
        let editTask = "<img class=\"edit-icon\" src=\"" + editIconNotActive + "\" alt=\"Edit\">";
        let deleteTask = "<img class=\"delete-icon\" src=\"" + deleteIconNotActive + "\" alt=\"Delete\">";

        let raw = "<tr><td>" + counter + "</td><td class=\"d-none id\">" + id + "</td><td class=\"d-none finished\">" + finished +"</td><td style=\"width: 95%\">" + textTask + "</td><td>" + markTask + "</td><td>" + editTask + "</td><td>" + deleteTask + "</td></tr>";
        tbody.append(raw);
}

function onAdd(){
     $("#addButton").on({
      "mouseover" : function() {
        this.src = addIconActive;
      },
      "mouseout" : function() {
        this.src= addIconNotActive;
      },
      "click" : function () {
          let textTask = $("#enter-event").val();
          let newTask = {
              id: null,
              task: textTask,
              finished: false
          };
          $.ajax({
              url: saveUrl,
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: 'POST',
              data: JSON.stringify(newTask),
              success: function () {
                  $("#enter-event").val("");
                  updateTable();
              }
          });
      }
    });
}

function onDeleteIcon() {
    $(".delete-icon").on({
        "mouseover" : function() {
            this.src = deleteIconActive;
        },
        "mouseout" : function() {
            this.src = deleteIconNotActive;
        },
        "click" : function () {
            let id = $(this).closest('tr').find('td.id').html();
            console.log(id);
            $.ajax({
                url: deleteUrl + id,
                method: 'DELETE',
                success: function () {
                    updateTable();
                }
            });
        }
    })
}


function onTaskInputChanged(input){
    input.attr('readonly', false);
    input.css("color","red");
    setCaretToTheEnd(input);

    input.on({
        "blur" : function(){
            $(this).attr('readonly', true);
            $(this).css("color","black");

            let id = $(this).closest('tr').find('td.id').html();
            let finished = $(this).closest('tr').find('td.finished').html();
            let task = $(this).val();

            $.ajax({
                url: saveUrl,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: JSON.stringify({
                    id: id,
                    task: task,
                    finished: finished
                })
            });
        }
    })
}

function onMark(){
    let finishedSrc = markIconActive;
    let notFinishedSrc = markIconNotActive;
    $(".mark-icon").on({
        "mouseover" : function() {
            let finished = $(this).closest('tr').find('td.finished').html();
            this.src = finished === "true" ? notFinishedSrc : finishedSrc;
        },
        "mouseout" : function() {
            let finished = $(this).closest('tr').find('td.finished').html();
            this.src = finished === "true" ? finishedSrc : notFinishedSrc;
        },
        "click" : function () {
            let id = $(this).closest('tr').find('td.id').html();
            let finished = $(this).closest('tr').find('td.finished').html();
            $.ajax({
                url: markUrl,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: JSON.stringify({
                    id : id,
                    finished : !(finished === 'true')
                }),
                success: function () {
                    updateTable();
                }
            });
        }
    })
}

function onEditIcon(){
    $(".edit-icon").on({
    "mouseover" : function() {
       this.src = editIconActive;
     },
     "mouseout" : function() {
       this.src = editIconNotActive;
     },
     "click" : function(){
        let input = $(this).closest('tr').find('td input');
        onTaskInputChanged(input);
            
     }
    });
}

function setCaretToTheEnd(input){
    let strLength = input.val().length * 2;            
    input.focus();
    console.log('red');
    input[0].setSelectionRange(strLength, strLength);
}


