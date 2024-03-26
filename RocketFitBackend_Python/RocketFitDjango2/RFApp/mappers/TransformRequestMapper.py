

from ast import Dict
from RFApp.dtos.ExerciseDTO import ExerciseDTO

from RFApp.dtos.ExerciseRecordDTO import ExerciseRecordDTO
from RFApp.dtos.RFAuthUserDTO import RfAuthUserDTO
from RFApp.dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from RFApp.dtos.WorkoutTemplateDTO import WorkoutTemplateDTO


class TransformRequestMapper:
    @staticmethod
    def to_er_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an ExerciseRecordDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            ExerciseRecordDTO: The converted ExerciseRecordDTO object.
        """
        return ExerciseRecordDTO(
            exerciseName = json_dict['exerciseName'],
            sets = json_dict['sets'],
            reps = json_dict['reps'],
            weight = json_dict['weight'],
            authId = json_dict['authId'],
            day = json_dict['day'],
            workoutNumber = json_dict['workoutNumber']
        )
    
    @staticmethod
    def to_e_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an ExerciseDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            ExerciseDTO: The converted ExerciseDTO object.
        """
        return ExerciseDTO(
            exerciseName = json_dict['exerciseName']
        )
    
    @staticmethod
    def to_rfau_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an RfAuthUserDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            RfAuthUserDTO: The converted RfAuthUserDTO object.
        """
        return RfAuthUserDTO(
            username = json_dict['username'],
            emailAddress = json_dict['emailAddress'],
            password = json_dict['password']
        )
    
    @staticmethod
    def to_we_dto(json_dict: Dict):
        """
        Converts a JSON dictionary (from the API request body) to a WorkoutExerciseDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            WorkoutExerciseDTO: The converted WorkoutExerciseDTO object.
        """
        return WorkoutExerciseDTO(
            days = json_dict["days"],
            exercises = json_dict["exercises"],
            sets = json_dict["sets"],
            reps = json_dict["reps"],
            rest = json_dict["rest"],
            weeks = json_dict["weeks"],
            authid = json_dict["authid"],
            workoutNumber = json_dict["workoutNumber"],
            workoutName = json_dict["workoutName"]
        )
    
    @staticmethod
    def to_wt_dto(json_dict: Dict):
        """
        Converts a JSON dictionary (from the API request body) to a WorkoutTemplateDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            WorkoutTemplateDTO: The converted WorkoutTemplateDTO object.
        """
        return WorkoutTemplateDTO(
            workoutName = json_dict['workoutName'],
            exercises = json_dict['exercises'],
            sets = json_dict['sets'],
            reps = json_dict['reps'],
            rest = json_dict['rest'],
            days = json_dict['days'],
            weeks= json_dict['weeks']
        )