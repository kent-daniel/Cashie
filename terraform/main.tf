terraform {
    required_providers {
        aws = {
        source  = "hashicorp/aws"
        version = "~> 4.21.0"
        }
        archive = {
            source  = "hashicorp/archive"
            version = "~> 2.2.0"
        }
    }
    
    required_version = ">= 1.0.0"
}

provider "aws" {
    region = "ap-southeast-2"
}