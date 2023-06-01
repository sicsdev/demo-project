output "cf" {
  value = aws_cloudfront_distribution.website.domain_name
}
output "name" {
  value = var.name
}
output "s3" {
  value = aws_s3_bucket.s3.bucket_regional_domain_name
}
output "website" {
  value = var.website
}
