data "aws_route53_zone" "main" {
  name         = var.zone
  private_zone = false
}
data "aws_acm_certificate" "main" {
  domain   = var.zone
  statuses = ["ISSUED"]
}
