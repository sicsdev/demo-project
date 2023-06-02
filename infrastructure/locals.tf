locals {
  slug = replace(replace(var.name, ".", "-"), "/", "-")
}
