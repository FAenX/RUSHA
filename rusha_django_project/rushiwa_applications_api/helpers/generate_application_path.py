import yaml

def generate_application_path(application_name):
    """Generate file path for new application"""
    try:       
        application_path = f'../applications/{application_name}'
        return application_path
    except Exception as e:
        raise e

    
        