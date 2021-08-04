function byStatuses(statuses) {
  return (child) => {
    if (child.children) {
      return child.children.length > 0;
    }
    return statuses[child.status];
  };
}

function byDuration(min, max) {
  return (child) => {
    if (child.children) {
      return child.children.length > 0;
    }
    return min <= child.time.duration && child.time.duration <= max;
  };
}

function byText(text) {
  text = (text && text.toLowerCase()) || "";
  return (child) => {
    const glued = [child.name, child.owner, child.tag].filter(Boolean).join("");
    return (
      !text ||
      glued.toLowerCase().indexOf(text) > -1 ||
      (child.children && child.children.some(byText(text)))
    );
  };
}


function byMark(marks) {
  return (child) => {
    if (child.children) {
      return child.children.length > 0;
    }
    return (!marks.newFailed || child.newFailed) && (!marks.flaky || child.flaky);
  };
}

function mix(...filters) {
  return (child) => {
    let result = true;
    filters.forEach((filter) => {
      result = result && filter(child);
    });
    return result;
  };
}

export { byStatuses, byDuration, byText, byMark, mix };
